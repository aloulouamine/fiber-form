import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, take, takeUntil, tap } from 'rxjs/operators';
import { Comment, Log, Mission } from 'src/app/core/models/mission';
import * as fromMissions from '../../../core/reducers';
import { addAdminComment, query } from '../../actions/mission.actions';

@Component({
  selector: 'app-mission-report',
  templateUrl: './mission-report.component.html',
  styleUrls: ['./mission-report.component.css']
})
export class MissionReportComponent implements OnInit, OnDestroy {

  mission$: Observable<Mission>;
  comments$: Observable<Comment[]>;
  logs$: Observable<Log[]>;
  unsubscribe$ = new Subject();

  // TODO refactor with  mission form
  writingComment$: Observable<boolean> = this.store.pipe(
    select(fromMissions.isWritingComment)
  );

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
      map(mission => mission && mission.comments as Comment[])
    );

    this.logs$ = this.mission$.pipe(
      filter(m => {
        return !!m && !!m.logs;
      }),
      map(m => [...m.logs as Log[]]),
      map(logs => logs && logs.reverse())
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

  // TODO refactor with mission form
  addComment({ comment, file }) {
    this.mission$.pipe(
      take(1),
      takeUntil(this.unsubscribe$)
    ).subscribe(mission => this.store.dispatch(addAdminComment({ comment, file, mission })));
  }

}
