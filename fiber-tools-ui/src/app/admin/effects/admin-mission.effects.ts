import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { MissionService } from 'src/app/core/services/mission.service';
import { added, MissionActionTypes, modified, query, removed } from '../actions/mission.actions';

@Injectable()
export class AdminMissionEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(MissionActionTypes.QUERY),
    switchMap((action: any) => this.missionsService.getSiteMissions(action.siteId)),
    mergeMap(actions => actions),
    map(action => {
      switch (action.type) {
        case 'added':
          return added({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'modified':
          return modified({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'removed':
          return removed({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
      }
    })
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(MissionActionTypes.UPDATE),
    switchMap((action: any) => this.missionsService.updateMission(action.siteId, action.missionId, action.changes).pipe(
      map(() => query({ siteId: action.siteId }))
    )),
  ))

  constructor(private actions$: Actions, private missionsService: MissionService) { }
}
