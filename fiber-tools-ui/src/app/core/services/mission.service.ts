import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Comment, Mission } from 'src/app/core/models/mission';
import uuidv4 from 'uuidv4';
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

  getAllMissionsForWorkingUser(workingUser: string): Observable<DocumentChangeAction<Mission>[]> {
    return this.afs.collectionGroup<Mission>('missions', ref => ref.where('workingUsers', 'array-contains', workingUser))
      .stateChanges();
  }

  updateMission(siteId: string, missionId: string, mission: Partial<Mission>) {
    return from(this.afs.doc<Mission>(`sites/${siteId}/missions/${missionId}`).update(mission));
  }

  addComment(mission: Mission, message: string): Observable<void> {
    const now = new Date();
    const id = uuidv4();
    return this.userService.getCurrentUser().pipe(
      map(user => <Comment>({
        id,
        message,
        createdAt: now,
        updateAt: now,
        photos: [],
        user: user.email
      })),
      mergeMap(comment => {
        const comments = mission.comments ? [...mission.comments] : [];
        comments.push(comment);
        return this.updateMission(mission.siteId, mission.id, {
          comments
        });
      })
    );
  }
}
