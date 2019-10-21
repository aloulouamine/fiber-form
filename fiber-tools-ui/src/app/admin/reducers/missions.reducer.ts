import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';
import { added, modified, removed } from '../actions/mission.actions';


export const missionsFeatureKey = 'missions';

export interface State extends EntityState<Mission> { }

export const missionAdapter = createEntityAdapter<Mission>();

export const initialState: State = missionAdapter.getInitialState();

export const missionsReducer = createReducer(
  initialState,
  on(added, (state, action) => missionAdapter.addOne(action.payload, state)),
  on(modified, (state, action) => missionAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state)),
  on(removed, (state, action) => missionAdapter.removeOne(action.payload.id, state))
);
