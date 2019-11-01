import { createAction, props } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';

export enum MissionActionTypes {
  QUERY = '[Mission admin] query site missions',
  SUCCESS = '[Mission admin] success',
  UPDATE = '[Mission admin] update',
  ADD = '[Mission admin] add',
  REMOVE = '[Mission admin] remove',
  ERROR = '[Mission admin] error'
}

export const query = createAction(
  MissionActionTypes.QUERY,
  props<{ siteId: string }>()
);

export const update = createAction(
  MissionActionTypes.UPDATE,
  props<{ siteId: string, missionId: string, changes: Partial<Mission> }>()
);

export const success = createAction(
  MissionActionTypes.SUCCESS,
  props<{ values: Mission[] }>()
);

export const loadMissionsApiError = createAction(
  MissionActionTypes.ERROR,
  props<{ errorMessage: string }>()
);

export const add = createAction(
  MissionActionTypes.ADD,
  props<{ payload: Mission }>()
);

export const remove = createAction(
  MissionActionTypes.REMOVE,
  props<{ payload: Mission }>()
);
