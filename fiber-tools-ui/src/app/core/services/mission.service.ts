import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Mission } from 'src/app/core/models/mission';
import { tap } from 'rxjs/operators';
import { Site } from '../models/site';

const missionsCollection = 'missions';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private afs: AngularFirestore) {

  }

  getMissions(): Observable<Mission[]> {
    return this.afs.collection<Mission>(missionsCollection).valueChanges({ idField: 'id' });
  }

  addMission(mission: Mission): Observable<DocumentReference> {
    return from(this.afs.collection(missionsCollection).add(mission));
  }

  getSiteMissions(siteId: string): Observable<DocumentChangeAction<Mission>[]> {
    return this.afs.collection<Mission>(`sites/${siteId}/missions`).stateChanges();
  }

  getAllMissionsForWorkingUser(workingUser: string): Observable<Mission[]> {

    return this.afs.collectionGroup<Mission>('missions', ref => ref.where('workingUsers', 'array-contains', workingUser))
      .valueChanges()
      .pipe(
        tap(missions => {
          missions.forEach((mission, index) => {
            // todo temporary id
            mission.id = `${index}`;
            mission.checkPoints.forEach(cp => {
              if (cp && cp.properties && cp.properties.colorCode) {
                cp.properties.colorCode = `#${cp.properties.colorCode}`;
              }
            });
          });
        })
      );
  }

  updateMission(missionId: string, mission: Partial<Mission>): Observable<void> {
    return from(this.afs.doc<Mission>(missionId).update(mission))
  }

  removeMission(site: Site, mission: Mission) {

  }
}
