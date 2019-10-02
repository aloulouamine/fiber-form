import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSites from './sites.reducer';
import * as fromUsers from './users.reducer';

export const adminFeatureKey = 'admin';

export interface AdminState {
  [fromSites.sitesFeatureKey]: fromSites.State,
  [fromUsers.usersFeatureKey]: fromUsers.State,
}

export interface State {
  [adminFeatureKey]: AdminState
}

export function reducer(state: AdminState | undefined, action: Action): AdminState {
  return combineReducers({
    [fromSites.sitesFeatureKey]: fromSites.sitesReducer,
    [fromUsers.usersFeatureKey]: fromUsers.usersReducer
  })(state, action);
}


export const getAdminState = createFeatureSelector<State, AdminState>(adminFeatureKey);

export const getSites = createSelector(
  getAdminState,
  state => state[fromSites.sitesFeatureKey]
);

export const sitesSelectors = fromSites.siteAdapter.getSelectors(getSites)

