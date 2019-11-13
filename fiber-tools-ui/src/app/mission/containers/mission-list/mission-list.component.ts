import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { Mission } from '../../../core/models/mission';
import * as fromMissions from '../../../core/reducers';
import { query } from '../../actions/mission-api.actions';


@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  missions$: Observable<Mission[]>;
  displayedColumns = ['number', 'checkPoints', 'capacity', 'shootingProgress', 'actions'];
  constructor(
    private store: Store<fromMissions.State>,
    private router: Router,
    private userService: UserService
  ) {
    this.missions$ = this.userService.getCurrentUser().pipe(
      map(user => user.email),
      tap(workingUser => this.store.dispatch(query({ workingUser }))),
      switchMap(email => this.store.pipe(
        select(fromMissions.getWorkingUserMissions, { email, store: this.store })
      )),
      filter(missions => !!missions),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editMission(mission: Mission) {
    this.router.navigate(['mission', mission.id]);
  }
}
