import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/models/user';
import { added, modified, removed } from '../actions/user.actions';


export const usersFeatureKey = 'users';

export interface State extends EntityState<User> { }

export const userAdapter = createEntityAdapter<User>();

export const initialState: State = userAdapter.getInitialState()

export const usersReducer = createReducer(
  initialState,
  on(added, (state, action) => userAdapter.addOne(action.payload, state)),
  on(modified, (state, action) => userAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state)),
  on(removed, (state, action) => userAdapter.removeOne(action.payload.id, state))
);
