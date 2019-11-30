import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, take, takeUntil, tap } from 'rxjs/operators';
import { AffectationDialogData } from 'src/app/core/models/affectation-dialog-data';
import { Mission } from 'src/app/core/models/mission';
import * as fromMissions from '../../../core/reducers';
import { update, query, affect } from '../../actions/mission.actions';
import { EditMissionDialogComponent } from '../../components/edit-mission-dialog/edit-mission-dialog.component';
import { UserService } from 'src/app/core/services/user.service';

const basicColumns = [
  'number',
  'checkPoints',
  'capacity',
  'wireRealTotalLength',
  'progress',
  'type',
  'step',
  'shootingProgress',
  'workingUsers'
];
@Component({
  selector: 'app-site-missions',
  templateUrl: './site-missions.component.html',
  styleUrls: ['./site-missions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteMissionsComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  siteId$: Observable<string> = this.route.params.pipe(map(params => params.id));
  nro$: Observable<string>;
  pm$: Observable<string>;
  missions$;


  displayedColumns$: Observable<string[]> = this.userService
    .getCurrentUserRoles()
    .pipe(
      map(r => r.admin ? [...basicColumns, 'actionsAdmin'] : [...basicColumns, 'actionsSupervisor'])
    );

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromMissions.State>,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
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
        emails: mission.workingUsers ? [...mission.workingUsers as string[]] : [],
        mission
      },
      width: '90%'
    }).afterClosed().subscribe((data: AffectationDialogData) => {
      if (!data) { return; }
      this.siteId$.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(siteId => {
        this.store.dispatch(affect({ siteId, missionId: mission.id, data }));
      });
    });
  }

  onReport(mission: Mission) {
    this.router.navigate(['admin', 'site', mission.siteId, 'mission', mission.id]);
  }
}
