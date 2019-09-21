import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/models/User';
import { loadSoudeursSuccess, loadTireursSuccess } from '../actions/users.actions';



export const usersFeatureKey = 'users';

export interface State {
  tireurs: User[],
  soudeurs: User[]
}

export const initialState: State = {
  tireurs: [],
  soudeurs: []
};

export const usersReducer = createReducer(
  initialState,
  on(loadSoudeursSuccess, (state, { soudeurs }) => ({ ...state, soudeurs })),
  on(loadTireursSuccess, (state, { tireurs }) => ({ ...state, tireurs }))
);
