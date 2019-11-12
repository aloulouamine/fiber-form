import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';
import { Mission, Comment } from 'src/app/core/models/mission';
import * as fromMissions from '../../../core/reducers';
import { query } from '../../actions/mission.actions';

@Component({
  selector: 'app-mission-report',
  templateUrl: './mission-report.component.html',
  styleUrls: ['./mission-report.component.css']
})
export class MissionReportComponent implements OnInit {

  mission$: Observable<Mission>;
  comments$: Observable<Comment[]>;

  constructor(
    private store: Store<fromMissions.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mission$ = this.route.params.pipe(
      tap(params => this.store.dispatch(query({ siteId: params.siteId }))),
      mergeMap(params => {
        return this.store.pipe(
          select(fromMissions.selectMissionById, { missionId: params.missionId, store: this.store })
        );
      })
    );

    this.comments$ = this.mission$.pipe(
      map(mission => mission.comments)
    );
  }

}
