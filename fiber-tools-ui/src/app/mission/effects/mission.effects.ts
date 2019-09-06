import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MissionService } from 'src/app/core/services/mission.service';
import { loadMissionApiFailure, loadMissionApiSuccess, MissionApiActionTypes } from '../actions/mission-api.actions';


@Injectable()
export class MissionEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(MissionApiActionTypes.LoadMissions),
    switchMap(() => {
      return this.missionService.getMissions().pipe(
        map(missions => loadMissionApiSuccess({ missions })),
        catchError(() => of(loadMissionApiFailure({ errorMessage: 'Loading missions failure' })))
      )
    })
  ));

  constructor(private actions$: Actions, private missionService: MissionService) { }
}
