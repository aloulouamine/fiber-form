import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { Mission } from '../../../core/models/mission';
import { query } from '../../actions/mission-api.actions';
import * as fromTechMissions from '../../reducers';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  missions$: Observable<Mission[]>;
  displayedColumns = ['number', 'checkPoints', 'nro', 'pm', 'capacity', 'actions'];
  constructor(
    private store: Store<fromTechMissions.State>,
    private router: Router,
    private userService: UserService
  ) {
    this.missions$ = store.pipe(
      select(fromTechMissions.missionsSelectors.selectAll)
    );

    !environment.production ? this.displayedColumns = ['id', ...this.displayedColumns] : '';
  }

  ngOnInit() {
    this.userService.getCurrentUserEmail().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      workingUser => this.store.dispatch(query({ workingUser }))
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editMission(mission: Mission) {
    this.router.navigate(['mission', mission.id]);
  }
}
