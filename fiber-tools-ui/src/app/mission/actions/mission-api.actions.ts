import { createAction, props } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';

export enum MissionFormActionTypes {
  QUERY = '[Mission] query',
  COMMENT_ADDED = '[Mission] comment added',
  UPDATE = '[Mission] update',
}

export const query = createAction(
  MissionFormActionTypes.QUERY,
  props<{ workingUser: string }>()
);

export const commentAdded = createAction(
  MissionFormActionTypes.COMMENT_ADDED
);

export const update = createAction(
  MissionFormActionTypes.UPDATE,
  props<{ siteId: string, missionId: string, changes: Partial<Mission> }>()
);
