import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '../../reducers';
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
    private store: Store<fromAdmin.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mission$ = this.route.params.pipe(
      tap(params => this.store.dispatch(query({ missionId : params.missionId }))),
      mergeMap(params => {
        return this.store.pipe(
          select(fromAdmin.getSiteMissionById, {missionId: params.missionId})
        )
      })
    )
  }

}
