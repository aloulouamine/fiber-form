export interface Box {
  ref: string;
}

export enum MissionProgressStatus {
  NEW,
  PROGRESS,
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

export interface Mission {
  _id?: string;
  title?: string;
  site: string
  type?: MissionType;
  boxes?: Box[];
  progress?: MissionProgressStatus;
  sync?: MissionSyncStatus;
  totalDistance?: number;
  progressDistance?: number;
  workingUser?: string;
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
}
