import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { query } from '../../actions/mission.actions';
import * as fromAdmin from '../../reducers';

@Component({
  selector: 'app-site-missions',
  templateUrl: './site-missions.component.html',
  styleUrls: ['./site-missions.component.css']
})
export class SiteMissionsComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>()
  siteId$: Observable<string> = this.route.params.pipe(map(params => params.id));
  missions$;
  displayedColumns = ['id', 'number', 'checkPoints', 'workingUsers', 'actions'];
  constructor(private route: ActivatedRoute, private store: Store<fromAdmin.State>) { }

  ngOnInit() {
    this.missions$ = this.store.pipe(
      select(fromAdmin.missionsSelectors.selectAll)
    )
    this.siteId$.pipe(
      tap(siteId => this.store.dispatch(query({ siteId }))),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
