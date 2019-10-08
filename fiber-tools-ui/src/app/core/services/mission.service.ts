import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Mission} from 'src/app/core/models/mission';
import {tap} from 'rxjs/operators';

const missionsCollection = 'missions';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private afs: AngularFirestore) {

  }

  getMissions(): Observable<Mission[]> {
    return this.afs.collection<Mission>(missionsCollection).valueChanges({idField: '_id'});
  }

  addMission(mission: Mission): Observable<DocumentReference> {
    return from(this.afs.collection(missionsCollection).add(mission));
  }

  getSiteMissions(siteId: string) {
    return this.afs.collection<Mission>(`sites/${siteId}/missions`).valueChanges();
  }

  getAllMissionsForWorkingUser(workingUser: string): Observable<Mission[]> {

    return this.afs.collectionGroup<Mission>('missions', ref => ref.where('workingUsers', 'array-contains', workingUser))
      .valueChanges()
      .pipe(
        tap(missions => {
          missions.forEach((mission, index) => {
            // todo temporary id
            mission._id = `${index}`;
            mission.checkPoints.forEach(cp => {
              if (cp && cp.properties && cp.properties.colorCode) {
                cp.properties.colorCode = `#${cp.properties.colorCode}`;
              }
            });
          });
        })
      );
  }
}
