import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap, mergeMap } from 'rxjs/operators';
import { Mission } from 'src/app/core/models/mission';
import { query, update } from '../../actions/mission.actions';
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
    this.missions$ = this.siteId$.pipe(
      tap(siteId => this.store.dispatch(query({ siteId }))),
      mergeMap(siteId => this.store.pipe(select(fromAdmin.getSiteMissions, { siteId })))
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onEdit(mission: Mission) {
    this.dialog.open(SelectUsersDialogComponent, {
      data: mission.workingUsers ? [...mission.workingUsers] : [],
      width: '90%'
    }).afterClosed().subscribe((emails: string[]) => {
      this.siteId$.pipe(takeUntil(this.unsubscribe$)).subscribe(siteId => {
        this.store.dispatch(update({ siteId, missionId: mission.id, changes: { workingUsers: emails } }))
      })
    });
  }
}
