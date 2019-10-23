import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';
import * as fromMissions from './mission.reducer';

export const TechMissionFeatureKey = 'techMission';

export interface TechMissionState {
  [fromMissions.missionFeatureKey]: fromMissions.State;
}


export interface State {
  [TechMissionFeatureKey]: TechMissionState;
}

export function reducer(state: TechMissionState, action: Action): TechMissionState {
  return combineReducers({
    [fromMissions.missionFeatureKey]: fromMissions.missionsReducer
  })(state, action);
}

export const getTechMissionSelector = createFeatureSelector<State, TechMissionState>(TechMissionFeatureKey);

export const getMissions = createSelector(
  getTechMissionSelector,
  state => state[fromMissions.missionFeatureKey]
);
export const missionsSelectors = fromMissions.missionAdapter.getSelectors(getMissions);

export const selectMissionById = createSelector(
  missionsSelectors.selectAll,
  (missions: Mission[], {missionId}) => {
    const index = missions.findIndex(mission => mission.id === missionId);
    return index >= 0 ? missions[index] : missions[0];
  }
);

export const checkpointProgress = createSelector(
  selectMissionById,
  (mission, { cpIndex }) => {
    debugger;
    const total = mission.checkPoints[cpIndex].nbPhotosToTakeWithinCheckPoint;
    if (total == 0) { return 100 }
    const taken = mission.checkPoints[cpIndex].properties.requiredPhotos.reduce(
      (acc, photo) =>
        photo.url ? ++acc : acc,
      0
    );
    console.log(`missionId: ${mission.id}, checkpointIndex ${cpIndex}, taken: ${taken}, total ${total}`)
    return taken / total * 100;
  }
)
export const isWritingComment = createSelector(
  getMissions,
  state => state.writingComment
);

