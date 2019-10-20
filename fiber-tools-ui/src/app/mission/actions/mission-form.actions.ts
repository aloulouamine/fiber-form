import { createAction, props } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';

export enum MissionFormActionTypes {
  UPDATE_CP_PICTURE = '[Mission] update picture',
  ADD_COMMENT = '[Mission] add comment'
}

export const updateCpPicture = createAction(
  MissionFormActionTypes.UPDATE_CP_PICTURE,
  props<{ file: File, mission: Mission, cpIndex: number, pictureIndex: number }>()
);

export const addComment = createAction(
  MissionFormActionTypes.ADD_COMMENT,
  props<{ mission: Mission, comment: string }>()
);
