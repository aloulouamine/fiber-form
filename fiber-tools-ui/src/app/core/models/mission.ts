import { Timestamp } from '@firebase/firestore-types';
import { CHECK_POINT_TYPE } from '../enum/check-point-type';

export interface CheckPoint {
  ref: string;
  properties: Properties;
  notRequiringPhotos;
  needsPbPhotoFlag;
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
  requiredPhotos: Photo[];
  nbOptionalPhotos: number;
}


export interface Photo {
  label: string;
  url: string;
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
  id: string;
  message: string;
  updateAt: Timestamp | Date;
  createdAt: Timestamp | Date;
  user: string;
  photos: Photo[];
}

export interface Mission {
  id?: string;
  title?: string;
  number: string;
  checkPoints: CheckPoint[];
  links: CheckPointLink[];
  cable?: string;
  sectionPreffixFromFirst: string;
  progress?: MissionProgressStatus;
  sync?: MissionSyncStatus;
  workingUsers?: string[];
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
  comments: Comment[];
  siteId: string;
}
