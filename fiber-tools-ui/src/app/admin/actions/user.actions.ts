import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user';

export enum UserActionTypes {
  QUERY = '[User] query',
  ADDED = '[User] added',
  MODIFIED = '[User] modified',
  REMOVED = '[User] removed',
  SUCCESS = '[User] success',
  UPDATE = '[User] update',
  ADD = '[User] add',
  REMOVE = '[User] remove',
  ERROR = '[User] error'
}

export const query = createAction(
  UserActionTypes.QUERY
);

export const added = createAction(
  UserActionTypes.ADDED,
  props<{ payload: User }>()
);

export const modified = createAction(
  UserActionTypes.MODIFIED,
  props<{ payload: User }>()
);

export const removed = createAction(
  UserActionTypes.REMOVED,
  props<{ payload: User }>()
);

export const update = createAction(
  UserActionTypes.REMOVED,
  props<{ id: string, changes: Partial<User> }>()
);

export const success = createAction(
  UserActionTypes.SUCCESS,
  props<{ values: User[] }>()
);

export const loadMissionsApiError = createAction(
  UserActionTypes.ERROR,
  props<{ errorMessage: string }>()
)

export const add = createAction(
  UserActionTypes.ADD,
  props<{ payload: User }>()
)

export const remove = createAction(
  UserActionTypes.REMOVE,
  props<{ payload: User }>()
)
