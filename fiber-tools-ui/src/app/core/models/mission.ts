import { FieldValue, Timestamp } from '@firebase/firestore-types';
import { Observable } from 'rxjs';
import { CHECK_POINT_TYPE } from '../enum/check-point-type';

export interface CheckPoint {
  ref: string;
  properties: Properties;
  nbPhotosToTakeWithinCheckPoint: number;
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

export interface PhotoData {
  url: string;
  by: string;
  date: Date;
}


export interface Photo extends PhotoData {
  label: string;
  history: PhotoData[];
}

export enum MissionProgressStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  FINISHED = 'FINISHED'
}

export enum MissionProgressStep {
  TIRAGE = 'TIRAGE',
  SOUDURE = 'SOUDURE',
  TEST = 'TEST'
}

export enum MissionSyncStatus {
  SYNC,
  PROGRESS,
  FAIL
}

export interface Affectation {
  by: string;
  to: string[];
  for: MissionProgressStep;
  date: any;
}

export interface Comment {
  id: string;
  message: string;
  updateAt: Timestamp | Date;
  createdAt: Timestamp | Date;
  user: string;
  photos: PhotoData[];
}

export interface Mission {
  id?: string;
  title?: string;
  number: string;
  capacity: string;
  pm: string;
  nro: string;
  checkPoints: CheckPoint[];
  links: CheckPointLink[];
  cable?: string;
  sectionPreffixFromFirst: string;
  progress?: MissionProgressStatus;
  step?: MissionProgressStep;
  shootingProgress$?: Observable<number>;
  sync?: MissionSyncStatus;
  workingUsers?: string[];
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
  comments: Comment[] | FieldValue;
  siteId: string;
  affectations: Affectation[] | FieldValue;

  firstTouretId: string;
  firstTouretMeteringEnd: number;
  firstTouretMeteringStart: number;
  secondTouretId: string;
  secondTouretMeteringEnd: number;
  secondTouretMeteringStart: number;

  geographicalLength: string;
  calculatedOverlength: string;
  wireRealTotalLength: string;
  type: string;
}
