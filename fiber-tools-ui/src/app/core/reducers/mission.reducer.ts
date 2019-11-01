import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Mission } from '../../core/models/mission';
import {  commentAdded} from '../../mission/actions/mission-api.actions';
import { added,  modified, removed } from '../actions/mission.actions';
import { addComment, uploadProgressCpPicture } from '../../mission/actions/mission-form.actions';


export const missionFeatureKey = 'mission';

export interface State extends EntityState<Mission> {
  writingComment: boolean;
  cpUploadProgress: { [key: string]: number };
}

export const missionAdapter = createEntityAdapter<Mission>();

export const initialState: State = missionAdapter.getInitialState({
  writingComment: false,
  cpUploadProgress: {}
});

export const missionsReducer = createReducer(
  initialState,
  on(added, (state, action) => missionAdapter.addOne(action.payload, state)),
  on(modified, (state, action) => missionAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state)),
  on(removed, (state, action) => missionAdapter.removeOne(action.payload.id, state)),
  on(addComment, state => ({ ...state, writingComment: true })),
  on(commentAdded, state => ({ ...state, writingComment: false })),
  on(uploadProgressCpPicture, (state, { key, progress }) => ({
    ...state, cpUploadProgress: {
      ...state.cpUploadProgress,
      [key]: progress
    }
  }))
);
