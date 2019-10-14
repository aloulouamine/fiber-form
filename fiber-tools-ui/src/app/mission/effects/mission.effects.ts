import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { MissionService } from 'src/app/core/services/mission.service';
import { added, MissionApiActionTypes, modified, removed } from '../actions/mission-api.actions';


@Injectable()
export class MissionEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(MissionApiActionTypes.QUERY),
    switchMap((action: any) => this.missionService.getAllMissionsForWorkingUser(action.workingUser)),
    mergeMap(action => action),
    map(action => {
      switch (action.type) {
        case 'added':
          return added({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'modified':
          return modified({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'removed':
          return removed({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
      }
    })));

  constructor(private actions$: Actions, private missionService: MissionService) {
  }
}
