import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/User';

export enum UsersActionTypes {
  LoadTireurs = '[Users] Load Tireurs',
  LoadTireursSuccess = '[Users] Load Tireurs success',
  LoadTireursFailure = '[Users] Load Tireurs failure',
  LoadSoudeurs = '[Users] Load Soudeurs',
  LoadSoudeursSuccess = '[Users] Load Soudeurs success',
  LoadSoudeursFailure = '[Users] Load Soudeurs failure',
}


export const loadTireurs = createAction(
  UsersActionTypes.LoadSoudeurs
);

export const loadTireursSuccess = createAction(
  UsersActionTypes.LoadSoudeursSuccess,
  props<{ tireurs: User[] }>()
)


export const loadTireursFailure = createAction(
  UsersActionTypes.LoadSoudeursFailure,
  props<{ errorMessage: string }>()
)



export const loadSoudeurs = createAction(
  UsersActionTypes.LoadSoudeurs
);

export const loadSoudeursSuccess = createAction(
  UsersActionTypes.LoadSoudeursSuccess,
  props<{ soudeurs: User[] }>()
)


export const loadSoudeursFailure = createAction(
  UsersActionTypes.LoadSoudeursFailure,
  props<{ errorMessage: string }>()
)
