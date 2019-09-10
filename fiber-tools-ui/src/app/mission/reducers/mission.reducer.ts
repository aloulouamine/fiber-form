import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loadMissionApiSuccess, addMissionSuccess } from '../actions/mission-api.actions';


export const missionFeatureKey = 'mission';

export interface MissionState {
  missions: any[];
}

export interface AppState {
  mission: MissionState
}

export const initialState: MissionState = {
  missions: []
};

const missionsReducer = createReducer(initialState,
  on(loadMissionApiSuccess, (state, { missions }) => ({ ...state, missions })),
  on(addMissionSuccess, (state, { missions }) => ({ ...state, missions }))
);

export function reducer(state = initialState, action: Action): MissionState {
  return missionsReducer(state, action);
}

export const selectMissions = createFeatureSelector<AppState, MissionState>(missionFeatureKey);

export const selectUserMissions = createSelector(
  selectMissions,
  (state: MissionState) => state.missions
);
