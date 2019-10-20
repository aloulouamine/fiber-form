import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Mission } from '../../core/models/mission';
import { added, modified, removed, commentAdded } from '../actions/mission-api.actions';
import { addComment } from '../actions/mission-form.actions';


export const missionFeatureKey = 'mission';

export interface State extends EntityState<Mission> {
  writingComment: boolean
}

export const missionAdapter = createEntityAdapter<Mission>();

export const initialState: State = missionAdapter.getInitialState({
  writingComment: false
});

export const missionsReducer = createReducer(
  initialState,
  on(added, (state, action) => missionAdapter.addOne(action.payload, state)),
  on(modified, (state, action) => missionAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state)),
  on(removed, (state, action) => missionAdapter.removeOne(action.payload.id, state)),
  on(addComment, state => ({ ...state, writingComment: true })),
  on(commentAdded, state => ({ ...state, writingComment: false }))
);
