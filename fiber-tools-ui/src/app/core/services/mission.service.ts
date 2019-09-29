import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Mission, MissionProgressStatus, MissionSyncStatus, MissionType, BoxType} from 'src/app/core/models/mission';


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
      boxes: [
        {ref: '64', type: BoxType.AERIAL},
        {ref: '64', type: BoxType.AERIAL},
        {ref: '64', type: BoxType.AERIAL},
        {ref: '64', type: BoxType.AERIAL},  
      ],
      links:[],
      progress: MissionProgressStatus.PROGRESS,
      sync: MissionSyncStatus.SYNC,
      totalDistance: 450,
      progressDistance: 200,
      workingUser: 'fahd@fibre.com',
      creator: 'foulen',
      createDate: new Date(),
      updateDate: new Date(),
      comments: []
    },
     {
      title: 'Tirage',
      enrollerNumah: 'Touret-ABCXX-2',
      site: 'ORCH_BRE1',
      type: MissionType.TIRAGE,
      cable: '5660178',
      boxes: [
        {ref: '64', type: BoxType.AERIAL},
        {ref: '64', type: BoxType.AERIAL},
        {ref: '64', type: BoxType.AERIAL},  
      ],
      links:[],
      progress: MissionProgressStatus.PROGRESS,
      sync: MissionSyncStatus.SYNC,
      totalDistance: 450,
      progressDistance: 200,
      workingUser: 'fahd@fibre.com',
      creator: 'foulen',
      createDate: new Date(),
      updateDate: new Date(),
      comments: []
    },
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
