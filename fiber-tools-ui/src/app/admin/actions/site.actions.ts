import { createAction, props } from '@ngrx/store';
import { Site } from 'src/app/core/models/site';

export enum SiteActionTypes {
  QUERY = '[Site] query',
  ADDED = '[Site] added',
  MODIFIED = '[Site] modified',
  REMOVED = '[Site] removed',
  SUCCESS = '[Site] success',
  UPDATE = '[Site] update',
  ADD = '[Site] add',
  REMOVE = '[Site] remove',
  ERROR = '[Site] error'
}

export const query = createAction(
  SiteActionTypes.QUERY
);

export const added = createAction(
  SiteActionTypes.ADDED,
  props<{ payload: Site }>()
);

export const modified = createAction(
  SiteActionTypes.MODIFIED,
  props<{ payload: Site }>()
);

export const removed = createAction(
  SiteActionTypes.REMOVED,
  props<{ payload: Site }>()
);

export const update = createAction(
  SiteActionTypes.REMOVED,
  props<{ id: string, changes: Partial<Site> }>()
);

export const success = createAction(
  SiteActionTypes.SUCCESS,
  props<{ values: Site[] }>()
);

export const loadSitesApiError = createAction(
  SiteActionTypes.ERROR,
  props<{ errorMessage: string }>()
)

export const add = createAction(
  SiteActionTypes.ADD,
  props<{ payload: Site }>()
)

export const remove = createAction(
  SiteActionTypes.REMOVE,
  props<{ payload: Site }>()
)
