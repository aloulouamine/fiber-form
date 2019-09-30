export interface CheckPoint {
  ref: string;
  properties: Properties;
}

export interface CheckPointLink {
  ref: string;
  distance: number;
  diameter: number;
}

export interface Properties {
  checkpointType: string;
  colorCode: string;
  meaning: string;
  nbPhotos: number;
  requiredPhotos?: any;
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
  checkPointLinks: CheckPointLink[];
  cable?: string;
  progress?: MissionProgressStatus;
  sync?: MissionSyncStatus;
  workingUser?: string;
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
  comments: Comment[];
}
