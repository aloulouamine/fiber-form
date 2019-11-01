import { createAction, props } from '@ngrx/store';

export enum MissionApiActionTypes {
  QUERY = '[Mission] query',
  COMMENT_ADDED = '[Mission] comment added'
}

export const query = createAction(
  MissionApiActionTypes.QUERY,
  props<{ workingUser: string }>()
);

export const commentAdded = createAction(
  MissionApiActionTypes.COMMENT_ADDED
);
