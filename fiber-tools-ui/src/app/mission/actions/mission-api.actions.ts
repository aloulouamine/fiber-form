import { Action, createAction, props } from '@ngrx/store';

export enum MissionApiActionTypes {
  LoadMissions = '[MissionApi] Load Missions',
  LoadMissionsSuccess = '[MissionApi] Load Missions Success',
  LoadMissionsFailure = '[MissionApi] Load Missions Failure',
}

export const loadMissionApi = createAction(
  MissionApiActionTypes.LoadMissions
)

export const loadMissionApiSuccess = createAction(
  MissionApiActionTypes.LoadMissionsSuccess,
  props<{ missions: any[] }>()
)

export const loadMissionApiFailure = createAction(
  MissionApiActionTypes.LoadMissionsFailure,
  props<{ errorMessage: string }>()
)

