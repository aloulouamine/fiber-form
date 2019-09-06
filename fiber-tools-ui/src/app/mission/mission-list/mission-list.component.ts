import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadMissionApi } from '../actions/mission-api.actions';
import * as fromMissions from '../reducers/mission.reducer';


@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {

  missions$;

  constructor(private store: Store<fromMissions.AppState>) {
    this.missions$ = store.pipe(
      select(fromMissions.selectUserMissions)
    )
  }

  ngOnInit() {
    this.store.dispatch(loadMissionApi())
  }

}
