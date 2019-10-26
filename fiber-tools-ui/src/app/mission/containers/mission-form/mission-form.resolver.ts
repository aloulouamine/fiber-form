import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromTechMissions from '../../reducers';
import { Mission } from 'src/app/core/models/mission';
import { take, filter } from 'rxjs/operators';

@Injectable()
export class MissionFormResolver implements Resolve<any> {

  constructor(private store: Store<fromTechMissions.State>) { }

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Mission> {
    return this.store.pipe(
      select(fromTechMissions.selectMissionById, { missionId: next.params.id }),
      filter(mission => !!mission),
      take(1)
    );

  }

}
