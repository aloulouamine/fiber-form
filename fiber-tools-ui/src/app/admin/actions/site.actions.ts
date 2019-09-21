import { createAction, props } from '@ngrx/store';
import { Site } from 'src/app/core/models/site';

export enum SiteActionTypes {
  LoadSitesApi = '[Site] Load Sites',
  LoadSitesApiSuccess = '[Site] Load Sites API success',
  LoadSitesApiError = '[Site] Load Sites API error'
}

export const loadSitesApi = createAction(
  SiteActionTypes.LoadSitesApi
);


export const loadSitesApiSuccess = createAction(
  SiteActionTypes.LoadSitesApiSuccess,
  props<{ values: Site[] }>()
);


export const loadSitesApiError = createAction(
  SiteActionTypes.LoadSitesApiError,
  props<{ errorMessage: string }>()
)


