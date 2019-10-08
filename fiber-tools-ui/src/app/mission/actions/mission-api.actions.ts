import {createAction, props} from '@ngrx/store';
import {Mission} from '../../core/models/mission';

export enum MissionApiActionTypes {
  LoadMissions = '[MissionApi] Load Missions',
  LoadMissionsSuccess = '[MissionApi] Load Missions Success',
  LoadMissionsFailure = '[MissionApi] Load Missions Failure',
  AddMission = '[MissionApi] Add Missions',
  AddMissionSuccess = '[MissionApi] Add Missions Success',
  AddMissionFailure = '[MissionApi] Load Missions Failure',
}

export const loadMissionApi = createAction(
  MissionApiActionTypes.LoadMissions,
  props<{ workingUser: string }>()
)

export const loadMissionApiSuccess = createAction(
  MissionApiActionTypes.LoadMissionsSuccess,
  props<{ missions: Mission[] }>()
)

export const loadMissionApiFailure = createAction(
  MissionApiActionTypes.LoadMissionsFailure,
  props<{ errorMessage: string }>()
)

export const addMissionApi = createAction(
  MissionApiActionTypes.AddMission,
  props<{ mission: Mission }>()
)

export const addMissionSuccess = createAction(
  MissionApiActionTypes.AddMissionSuccess
)

export const addMissionApiFailure = createAction(
  MissionApiActionTypes.AddMissionFailure,
  props<{ errorMessage: string }>()
)

