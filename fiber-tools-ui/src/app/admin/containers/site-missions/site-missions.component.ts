import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, take, takeUntil, tap } from 'rxjs/operators';
import { Mission, MissionProgressStatus } from 'src/app/core/models/mission';
import * as fromMissions from '../../../core/reducers';
import { query, update } from '../../actions/mission.actions';
import { EditMissionDialogComponent } from '../../components/edit-mission-dialog/edit-mission-dialog.component';

@Component({
  selector: 'app-site-missions',
  templateUrl: './site-missions.component.html',
  styleUrls: ['./site-missions.component.css']
})
export class SiteMissionsComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  siteId$: Observable<string> = this.route.params.pipe(map(params => params.id));
  nro$: Observable<string>;
  pm$: Observable<string>;
  missions$;
  displayedColumns = [
    'number',
    'checkPoints',
    'capacity',
    'firstTouret',
    'wireRealTotalLength',
    'progress',
    'type',
    'shootingProgress',
    'workingUsers',
    'actionsAdmin'
  ];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromMissions.State>,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.missions$ = this.siteId$.pipe(
      tap(siteId => this.store.dispatch(query({ siteId }))),
      mergeMap(siteId => this.store.pipe(select(fromMissions.getSiteMissions, { siteId, store: this.store })))
    );

    const one$: Observable<Mission> = this.missions$.pipe(
      map(missions => missions && missions[0]),
      filter(m => !!m),
      take(1)
    );

    this.nro$ = one$.pipe(map(m => m.nro));
    this.pm$ = one$.pipe(map(m => m.pm));

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onEdit(mission: Mission) {
    this.dialog.open(EditMissionDialogComponent, {
      data: {
        emails: mission.workingUsers ? [...mission.workingUsers] : [],
        mission
      },
      width: '90%'
    }).afterClosed().subscribe((data: any[]) => {
      const [emails, tourets] = data;
      const changes = { workingUsers: emails, ...tourets, progress: MissionProgressStatus.IN_PROGRESS };
      if (emails) {
        this.siteId$.pipe(takeUntil(this.unsubscribe$)).subscribe(siteId => {
          this.store.dispatch(update({ siteId, missionId: mission.id, changes }));
        });
      }
    });
  }

  onReport(mission: Mission) {
    this.router.navigate(['admin', 'site', mission.siteId, 'mission', mission.id]);
  }
}
