import { createAction, props } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';

export enum MissionActionTypes {
  ADDED = '[Mission] added',
  MODIFIED = '[Mission] modified',
  REMOVED = '[Mission] removed',
}

export const added = createAction(
  MissionActionTypes.ADDED,
  props<{ payload: Mission }>()
);

export const modified = createAction(
  MissionActionTypes.MODIFIED,
  props<{ payload: Mission }>()
);


export const removed = createAction(
  MissionActionTypes.REMOVED,
  props<{ payload: Mission }>()
);
