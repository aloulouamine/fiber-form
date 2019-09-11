import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadMissionApi } from '../../actions/mission-api.actions';
import * as fromMissions from '../../reducers/mission.reducer';
import { Mission } from '../../models/mission';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {

  missions$: Observable<Mission[]>;

  constructor(private store: Store<fromMissions.AppState>) {
    this.missions$ = store.pipe(
      select(fromMissions.selectUserMissions)
    )
  }

  ngOnInit() {
    this.store.dispatch(loadMissionApi())
  }

  getMissionProgressValue(mission: Mission) {
    return ((mission.progressDistance / mission.totalDistance) * 100).toFixed(0)
  }

}
