import {CHECK_POINT_TYPE} from '../enum/check-point-type';

export interface CheckPoint {
  ref: string;
  properties: Properties;
}

export interface CheckPointLink {
  ref: string;
  value: number;
  section: number;
}

export interface Properties {
  checkpointType: CHECK_POINT_TYPE;
  colorCode: string;
  nbPhotos: number;
  requiredPhotos?: any;
  nbOptionalPhotos: number;
}

export enum MissionProgressStatus {
  NEW,
  PROGRESS,
  SUSPENDED,
  FINISHED
}

export enum MissionSyncStatus {
  SYNC,
  PROGRESS,
  FAIL
}

export enum MissionType {
  TIRAGE,
  SOUDURE
}

export interface Comment {
  message: string;
  updateAt: Date;
  createdAt: Date;
  user: string;
}

export interface Mission {
  _id?: string;
  title?: string;
  number: string;
  checkPoints: CheckPoint[];
  links: CheckPointLink[];
  cable?: string;
  progress?: MissionProgressStatus;
  sync?: MissionSyncStatus;
  workingUsers?: string[];
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
  comments: Comment[];
}
