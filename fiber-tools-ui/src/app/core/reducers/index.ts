import { Action, combineReducers, createFeatureSelector, createSelector, select } from '@ngrx/store';
import { CheckPoint } from 'src/app/core/models/mission';
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
  missionsSelectors.selectEntities,
  (missions, { missionId }) => {
    return missions[missionId];
  }
);

export const allMissionsWithProgress = createSelector(
  missionsSelectors.selectAll,
  (missions, {store}) => missions.map(m =>({
    ...m,
    shootingProgress$: store.pipe(select(missionShootingProgress, {missionId: m.id})) 
  }))
)

export const getSiteMissions = createSelector(
  allMissionsWithProgress,
  (missions, { siteId }) => missions.filter(m => m.siteId === siteId)
);

export const getWorkingUserMissions = createSelector(
  allMissionsWithProgress,
  (missions, { email }) => missions.filter(m => m && m.workingUsers && m.workingUsers.includes(email))
);

export const checkpointShootingProgress = createSelector(
  selectMissionById,
  (mission, { cpIndex }) => _checkpointProgress(mission.checkPoints[cpIndex])
);

export const missionShootingProgress = createSelector(
  selectMissionById,
  mission =>
    mission && mission.checkPoints.reduce((acc, cp) => {
      acc += _checkpointProgress(cp);
      return acc;
    }, 0) / mission.checkPoints.length
);

function _checkpointProgress(cp: CheckPoint): number {
  const total = cp.nbPhotosToTakeWithinCheckPoint;
  if (total === 0) { return 100; }
  const taken = cp.properties.requiredPhotos.reduce(
    (acc, photo) =>
      photo.url ? ++acc : acc,
    0
  );
  return taken / total * 100;
}

export const isWritingComment = createSelector(
  getMissions,
  state => state.writingComment
);


export const cpUploadProgress = createSelector(
  getMissions,
  (state, { missionId, cpIndex, pictureIndex }) => state.cpUploadProgress[`${missionId}-${cpIndex}-${pictureIndex}`]
);



