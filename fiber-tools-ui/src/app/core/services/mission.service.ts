import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Mission, MissionProgressStatus, MissionSyncStatus, MissionType} from 'src/app/core/models/mission';


@Injectable({
  providedIn: 'root'
})
export class MissionService {
  missions: Mission[] = [
    {
      title: 'Tirage',
      enrollerNumah: 'Touret-ABCXX-1',
      site: 'ORCH_BRE1',
      type: MissionType.TIRAGE,
      cable: '5660178',
      rooms: [
        {ref: '64'},
        {ref: '379'},
        {ref: '384'}
      ],
      progress: MissionProgressStatus.PROGRESS,
      sync: MissionSyncStatus.SYNC,
      totalDistance: 450,
      progressDistance: 200,
      workingUser: 'fahd@fibre.com',
      creator: 'foulen',
      createDate: new Date(),
      updateDate: new Date(),
      comment: ''
    },
    /*   {
         title: 'Tirage',
         site: 'R1234',
         type: MissionType.TIRAGE,
         boxes: [
           { ref: 'B123' },
           { ref: 'B456' },
           { ref: 'B789' },
           { ref: 'B012' },
         ],
         progress: MissionProgressStatus.PROGRESS,
         sync: MissionSyncStatus.SYNC,
         totalDistance: 500,
         progressDistance: 0,
         createDate: new Date(),
         updateDate: new Date()
       },*/
  ];


  constructor() {
  }

  getMissions(): Observable<Mission[]> {
    return of(this.missions);
  }

  addMission(mission: Mission): Observable<any> {
    this.missions = [...this.missions, mission];
    return of(this.missions);
  }
}
