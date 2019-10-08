import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Site } from 'src/app/core/models/site';
import { added, modified, removed } from '../actions/site.actions';


export const sitesFeatureKey = 'sites';

export interface State extends EntityState<Site> { }

export const siteAdapter = createEntityAdapter<Site>();

export const initialState: State = siteAdapter.getInitialState()

export const sitesReducer = createReducer(
  initialState,
  on(added, (state, action) => siteAdapter.addOne(action.payload, state)),
  on(modified, (state, action) => siteAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state)),
  on(removed, (state, action) => siteAdapter.removeOne(action.payload.id, state))
);
