import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Affectation, Comment, Mission, Photo } from 'src/app/core/models/mission';
import uuidv4 from 'uuidv4';
import { AffectationDialogData } from '../models/affectation-dialog-data';
import { UserService } from './user.service';

const missionsCollection = 'missions';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private afs: AngularFirestore, private userService: UserService) { }

  getMissions(): Observable<Mission[]> {
    return this.afs.collection<Mission>(missionsCollection).valueChanges({ idField: 'id' });
  }

  addMission(mission: Mission): Observable<DocumentReference> {
    return from(this.afs.collection(missionsCollection).add(mission));
  }

  getSiteMissions(siteId: string): Observable<DocumentChangeAction<Mission>[]> {
    return this.afs.collection<Mission>(`sites/${siteId}/missions`).stateChanges();
  }

  getMission(siteId: string, missionId: string): Observable<Mission> {
    return this.afs.doc<Mission>(`sites/${siteId}/missions/${missionId}`).get().pipe(
      map(docSnapshot => docSnapshot.data() as Mission)
    );
  }

  getAllMissionsForWorkingUser(workingUser: string): Observable<DocumentChangeAction<Mission>[]> {
    return this.afs.collectionGroup<Mission>('missions', ref => ref.where('workingUsers', 'array-contains', workingUser))
      .stateChanges();
  }

  updateMission(siteId: string, missionId: string, mission: Partial<Mission>) {
    return from(this.afs.doc<Mission>(`sites/${siteId}/missions/${missionId}`).update(mission));
  }

  affectMission(siteId: string, missionId: string, data: AffectationDialogData) {
    const missionRef = this.afs.doc<Mission>(`sites/${siteId}/missions/${missionId}`).ref;
    return from(this.afs.firestore.runTransaction(async (transaction) => {
      return transaction.get(missionRef).then(
        async (missionDoc) => {
          if (!missionDoc.exists) {
            throw new Error(`Mission ${missionId} does not exist`);
          }
          const mission = missionDoc.data() as Mission;
          const user = await this.userService.getCurrentUser().pipe(take(1)).toPromise();
          const affectation: Affectation = {
            by: user.email,
            to: data.emails,
            for: data.step
          };
          let changes: Partial<Mission> = {
            affectations: mission.affectations ? [affectation, ...mission.affectations] : [affectation],
            workingUsers: data.emails,
            step: data.step,
          };
          if (data.touretInfo) {
            changes = { ...changes, ...data.touretInfo };
          }
          transaction.update(missionRef, { ...changes });
        }
      );
    }));
  }

  updatePictureURL(mission: Mission, pictureURL: string, cpIndex: number, pictureIndex: number): Observable<void> {
    const missionRef = this.afs.doc<Mission>(`sites/${mission.siteId}/missions/${mission.id}`).ref;
    return from(this.afs.firestore.runTransaction(async (transaction) => {
      return transaction.get(missionRef).then(
        async (missionDoc) => {
          if (!missionDoc.exists) {
            throw new Error(`Mission ${mission.id} does not exist`);
          }
          const checkPoints = (missionDoc.data() as Mission).checkPoints;
          const user = await this.userService.getCurrentUser().pipe(take(1)).toPromise();
          const now = new Date();
          const photo = checkPoints[cpIndex].properties.requiredPhotos[pictureIndex];
          if (photo.url) {
            const historyItem = {
              by: photo.by || null,
              url: photo.url,
              date: photo.date || null
            };
            photo.history ? photo.history = [
              historyItem,
              ...photo.history
            ] : photo.history = [
              historyItem
            ];
          }
          photo.url = pictureURL;
          photo.by = user.email;
          photo.date = now;
          transaction.update(missionRef, { checkPoints });
          return;
        });
    }));
  }




  addComment(mission: Mission, comment: Comment): Observable<Comment> {
    const comments = mission.comments ? [...mission.comments] : [];
    comments.push(comment);
    return this.updateMission(mission.siteId, mission.id, {
      comments
    }).pipe(map(() => comment));
  }

  createNewComment(message: string, photos: Photo[]): Observable<Comment> {
    const now = new Date();
    return this.userService.getCurrentUser().pipe(
      map(user => ({
        id: uuidv4(),
        message,
        createdAt: now,
        updateAt: now,
        photos,
        user: user.email
      }) as Comment)
    );
  }
}
