import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMissions from '../../../core/reducers';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { query } from '../../actions/mission.actions';

@Component({
  selector: 'app-mission-report',
  templateUrl: './mission-report.component.html',
  styleUrls: ['./mission-report.component.css']
})
export class MissionReportComponent implements OnInit {

  mission$;

  constructor(
    private store: Store<fromMissions.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mission$ = this.route.params.pipe(
      tap(params => this.store.dispatch(query({ siteId : params.missionId }))),
      mergeMap(params => {
        return this.store.pipe(
          select(fromMissions.selectMissionById, {missionId: params.missionId})
        );
      })
    );
  }

}
