import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Mission } from 'src/app/core/models/mission';
import { UserService } from 'src/app/core/services/user.service';
import { query } from '../../actions/mission-api.actions';
import * as fromTechMissions from '../../reducers';

@Injectable()
export class MissionListResolver implements Resolve<Observable<Mission[]>>{


  constructor(
    private store: Store<fromTechMissions.State>,
    private userService: UserService
  ) {
    
  }

  resolve() {
    return this.userService.getCurrentUserEmail().pipe(
      tap(workingUser => this.store.dispatch(query({ workingUser }))),
      switchMap(() => this.store.pipe(
        select(fromTechMissions.missionsSelectors.selectAll)
      )),
      map(missions => missions.map(m => ({
        ...m,
        shootingProgress$: this.store.pipe(
          select(fromTechMissions.missionShootingProgress, { missionId: m.id })
        )
      }))),
      take(1)
    )
  }
}
