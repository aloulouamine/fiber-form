import { createAction, props } from '@ngrx/store';
import { Mission } from '../models/mission';

export enum MissionApiActionTypes {
  LoadMissions = '[MissionApi] Load Missions',
  LoadMissionsSuccess = '[MissionApi] Load Missions Success',
  LoadMissionsFailure = '[MissionApi] Load Missions Failure',
  AddMission = '[MissionApi] Add Missions',
  AddMissionSuccess = '[MissionApi] Add Missions Success',
  AddMissionFailure = '[MissionApi] Load Missions Failure',
}

export const loadMissionApi = createAction(
  MissionApiActionTypes.LoadMissions
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
  props<{ mission: any }>()
)

export const addMissionSuccess = createAction(
  MissionApiActionTypes.AddMissionSuccess,
  props<{ missions: any[] }>()
)

export const addMissionApiFailure = createAction(
  MissionApiActionTypes.AddMissionFailure,
  props<{ errorMessage: string }>()
)

