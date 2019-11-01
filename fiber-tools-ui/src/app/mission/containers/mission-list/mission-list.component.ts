import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission } from '../../../core/models/mission';
import * as fromTechMissions from '../../reducers';


@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  missions$: Observable<Mission[]>;
  displayedColumns = ['id', 'number', 'checkPoints', 'nro', 'pm', 'capacity', 'shootingProgress', 'actions'];
  constructor(
    private store: Store<fromTechMissions.State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.missions$ = this.store.pipe(
      select(fromTechMissions.missionsSelectors.selectAll),
      map(missions => missions.map(m => ({
        ...m,
        shootingProgress$: this.store.pipe(
          select(fromTechMissions.missionShootingProgress, { missionId: m.id })
        )
      })
      ))
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
