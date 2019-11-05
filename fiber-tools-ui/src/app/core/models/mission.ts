import {Timestamp} from '@firebase/firestore-types';
import {CHECK_POINT_TYPE} from '../enum/check-point-type';
import {Observable} from 'rxjs';

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
  TIRAGE = 'TIRAGE',
  RACCORDEMENT = 'RACCORDEMENT',
  TEST = 'TEST',
  FINISHED = 'FINISHED'
}

export enum MissionSyncStatus {
  SYNC,
  PROGRESS,
  FAIL
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
  shootingProgress$?: Observable<number>;
  sync?: MissionSyncStatus;
  workingUsers?: string[];
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
  comments: Comment[];
  siteId: string;
  // Touret 1
  firstTouretId: string;
  firstTouretMeteringStart: number;
  firstTouretMeteringEnd: number;

  // Touret 2
  secondTouretId: string;
  secondTouretMeteringStart: number;
  secondTouretMeteringEnd: number;
}
