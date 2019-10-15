import { createAction, props } from '@ngrx/store';
import { Mission } from '../../core/models/mission';

export enum MissionApiActionTypes {
  QUERY = '[Mission] query',
  ADDED = '[Mission] added',
  MODIFIED = '[Mission] modified',
  REMOVED = '[Mission] removed',
  SUCCESS = '[Mission] success',
  UPDATE_CP_PICTURE = '[Mission] update picture',
}

export const query = createAction(
  MissionApiActionTypes.QUERY,
  props<{ workingUser: string }>()
)

export const added = createAction(
  MissionApiActionTypes.ADDED,
  props<{ payload: Mission }>()
)


export const modified = createAction(
  MissionApiActionTypes.MODIFIED,
  props<{ payload: Mission }>()
)


export const removed = createAction(
  MissionApiActionTypes.REMOVED,
  props<{ payload: Mission }>()
)

export const updateCpPicture = createAction(
  MissionApiActionTypes.UPDATE_CP_PICTURE,
  props<{ file: File, mission : Mission, cpIndex: number, pictureIndex: number}>()
)
