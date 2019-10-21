import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSites from './sites.reducer';
import * as fromUsers from './users.reducer';
import * as fromMissions from './missions.reducer';
import { User } from 'src/app/core/models/user';

export const adminFeatureKey = 'admin';

export interface AdminState {
  [fromSites.sitesFeatureKey]: fromSites.State;
  [fromUsers.usersFeatureKey]: fromUsers.State;
  [fromMissions.missionsFeatureKey]: fromMissions.State;
}

export interface State {
  [adminFeatureKey]: AdminState;
}

export function reducer(state: AdminState | undefined, action: Action): AdminState {
  return combineReducers({
    [fromSites.sitesFeatureKey]: fromSites.sitesReducer,
    [fromUsers.usersFeatureKey]: fromUsers.usersReducer,
    [fromMissions.missionsFeatureKey]: fromMissions.missionsReducer
  })(state, action);
}


export const getAdminState = createFeatureSelector<State, AdminState>(adminFeatureKey);

export const getSites = createSelector(
  getAdminState,
  state => state[fromSites.sitesFeatureKey]
);

export const getMissions = createSelector(
  getAdminState,
  state => state[fromMissions.missionsFeatureKey]
);

export const getUsers = createSelector(
  getAdminState,
  state => state[fromUsers.usersFeatureKey]
);

export const sitesSelectors = fromSites.siteAdapter.getSelectors(getSites);

export const missionsSelectors = fromMissions.missionAdapter.getSelectors(getMissions);

export const getSiteMissions = createSelector(
  missionsSelectors.selectAll,
  (missions, { siteId }) => missions.filter(m => m.siteId === siteId)
);

export const userSelectors = fromUsers.userAdapter.getSelectors(getUsers);

export const searchUserSelector = createSelector(
  userSelectors.selectAll,
  (users, { query }) => users.filter((user: User) => user.email.toLowerCase().includes(query.toLowerCase())));

