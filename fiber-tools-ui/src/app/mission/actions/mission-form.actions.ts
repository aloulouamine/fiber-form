import { createAction, props } from '@ngrx/store';
import { Mission } from 'src/app/core/models/mission';

export enum MissionFormActionTypes {
  UPLOAD_CP_PICTURE = '[Mission] upload cp picture',
  UPLOAD_PROGRESS_CP_PICTURE = '[Mission] progress cp picture',
  UPLOAD_FINISH_CP_PICTURE = '[Mission] upload cp picture finish',
  UPLOADED_CP_PICTURE = '[Mission] uploaded cp picture',
  DELETE_CP_PICTURE = '[Mission] delete cp picture',
  DELETED_CP_PICTURE = '[Mission] deleted cp picture',
  ADD_COMMENT = '[Mission] add comment'
}

export const uploadCpPicture = createAction(
  MissionFormActionTypes.UPLOAD_CP_PICTURE,
  props<{ file: File, mission: Mission, cpIndex: number, pictureIndex: number }>()
);

export const uploadCpPictureFinish = createAction(
  MissionFormActionTypes.UPLOAD_FINISH_CP_PICTURE,
  // props<{ file: File, mission: Mission, cpIndex: number, pictureIndex: number }>()
);

export const uploadProgressCpPicture = createAction(
  MissionFormActionTypes.UPLOAD_PROGRESS_CP_PICTURE,
  props<{ key: string, progress: number }>()
);

export const uploadedCpPicture = createAction(
  MissionFormActionTypes.UPLOADED_CP_PICTURE
);

export const deleteCpPicture = createAction(
  MissionFormActionTypes.DELETE_CP_PICTURE,
  props<{ mission: Mission, cpIndex: number, pictureIndex: number }>()
);
export const deletedCpPicture = createAction(
  MissionFormActionTypes.DELETED_CP_PICTURE
);

export const addComment = createAction(
  MissionFormActionTypes.ADD_COMMENT,
  props<{ mission: Mission, file: File, comment: string }>()
);
