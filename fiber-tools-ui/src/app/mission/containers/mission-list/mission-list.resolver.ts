import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Mission } from 'src/app/core/models/mission';
import { UserService } from 'src/app/core/services/user.service';
import * as fromMissions from '../../../core/reducers';
import { query } from '../../actions/mission-api.actions';

@Injectable()
export class MissionListResolver implements Resolve<Observable<Mission[]>> {


  constructor(
    private store: Store<fromMissions.State>,
    private userService: UserService
  ) {

  }

  resolve() {
    return this.userService.getCurrentUserEmail().pipe(
      tap(workingUser => this.store.dispatch(query({ workingUser }))),
      switchMap(email => this.store.pipe(
        select(fromMissions.getWorkingUserMissions, { email, store: this.store })
      )),
      take(1)
    );
  }
}
