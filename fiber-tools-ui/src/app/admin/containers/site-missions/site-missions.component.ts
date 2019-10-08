import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Mission } from 'src/app/core/models/mission';
import { query } from '../../actions/mission.actions';
import { SelectUsersDialogComponent } from '../../components/select-users-dialog/select-users-dialog.component';
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

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromAdmin.State>,
    private dialog: MatDialog
  ) { }

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

  onEdit(mission: Mission) {
    this.dialog.open(SelectUsersDialogComponent, {
      data: mission.workingUsers ? [...mission.workingUsers] : []
    });
  }
}
