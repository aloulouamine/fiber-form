import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { MissionService } from 'src/app/core/services/mission.service';
import { addMissionSuccess, loadMissionApiFailure, loadMissionApiSuccess, MissionApiActionTypes } from '../actions/mission-api.actions';


@Injectable()
export class MissionEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(MissionApiActionTypes.LoadMissions),
    switchMap(() => this.missionService.getMissions().pipe(
      map(missions => loadMissionApiSuccess({ missions })),
      catchError(() => of(loadMissionApiFailure({ errorMessage: 'Loading missions failure' })))
    ))
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(MissionApiActionTypes.AddMission),
    mergeMap(({ mission }) =>
      this.missionService.addMission(mission).pipe(
        map(() => addMissionSuccess())
      )
    )
  ));


  constructor(private actions$: Actions, private missionService: MissionService) { }
}
