import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Mission } from 'src/app/core/models/mission';

const missionsCollection = 'missions';
@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private afs: AngularFirestore) {

  }

  getMissions(): Observable<Mission[]> {
    return this.afs.collection<Mission>(missionsCollection).valueChanges({ idField: '_id' });
  }

  addMission(mission: Mission): Observable<DocumentReference> {
    return from(this.afs.collection(missionsCollection).add(mission));
  }

  getSiteMissions(siteId: string) {
    return this.afs.collection<Mission>(`sites/${siteId}/missions`).valueChanges();
  }

  getAllMissions() {
    return this.afs.collectionGroup('missions').stateChanges()
  }
}
