import { createReducer, on } from '@ngrx/store';
import { Site } from 'src/app/core/models/Site';
import { loadSitesApi, loadSitesApiError, loadSitesApiSuccess } from '../actions/site.actions';


export const sitesFeatureKey = 'sites';

export interface State {
  loading: boolean;
  values: Site[];
  loaded: boolean;
  error: boolean,
  errorMessage: string;
}

export const initialState: State = {
  values: [],
  loaded: false,
  loading: false,
  error: false,
  errorMessage: null
};

export const sitesReducer = createReducer(
  initialState,
  on(loadSitesApi, state => ({ ...state, loading: true })),
  on(loadSitesApiSuccess, (state, { values }) => ({ ...state, values, loading: false, loaded: true })),
  on(loadSitesApiError, (state, { errorMessage }) => ({ ...state, loading: false, loaded: false, error: true, errorMessage }))
);
