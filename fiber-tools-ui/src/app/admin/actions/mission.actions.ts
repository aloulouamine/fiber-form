import { createAction, props } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';
import { AffectationDialogData } from 'src/app/core/models/affectation-dialog-data';

export enum MissionActionTypes {
  QUERY = '[Mission admin] query site missions',
  SUCCESS = '[Mission admin] success',
  UPDATE = '[Mission admin] update',
  AFFECT = '[Mission admin] affect',
  ADD = '[Mission admin] add',
  REMOVE = '[Mission admin] remove',
  ERROR = '[Mission admin] error',
  ADD_ADMIN_COMMENT = '[Mission admin] Add admin comment'
}

export const query = createAction(
  MissionActionTypes.QUERY,
  props<{ siteId: string }>()
);

export const update = createAction(
  MissionActionTypes.UPDATE,
  props<{ siteId: string, missionId: string, changes: Partial<Mission> }>()
);

export const affect = createAction(
  MissionActionTypes.AFFECT,
  props<{ siteId: string, missionId: string, data: AffectationDialogData}>()
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


export const addAdminComment = createAction(
  MissionActionTypes.ADD_ADMIN_COMMENT,
  props<{ mission: Mission, file: File, comment: string }>()
);