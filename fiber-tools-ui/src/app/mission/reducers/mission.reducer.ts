import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Mission } from '../../core/models/mission';
import { added, modified, removed } from '../actions/mission-api.actions';


export const missionFeatureKey = 'mission';

export interface State extends EntityState<Mission> { }

export const missionAdapter = createEntityAdapter<Mission>();

export const initialState: State = missionAdapter.getInitialState();

export const missionsReducer = createReducer(
  initialState,
  on(added, (state, action) => missionAdapter.addOne(action.payload, state)),
  on(modified, (state, action) => missionAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state)),
  on(removed, (state, action) => missionAdapter.removeOne(action.payload.id, state))
);



/* export const missionsSelectors = missionAdapter.getSelectors(selectMissions);

export const selectMissionById = createSelector(
  missionsSelectors.selectAll,
  (missions: Mission[], props) => {
    let index = missions.findIndex(mission => mission.id === props.id)
    return index >= 0 ? missions[index] : missions[0];
  }
) */