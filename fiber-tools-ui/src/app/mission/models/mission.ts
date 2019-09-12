export interface Box {
  ref: string;
}

// Similar to Box, but they will be holding different information
// Once we know more bout what to do
export interface Room {
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
  site: string;
  enrollerNumah: string;
  type?: MissionType;
  // ---------------------
  // Will be associated to MissionType.SOUDURE
  boxes?: Box[];
  // -----------------------
  // ---------------------
  // Will be associated to MissionType.TIRAGE
  rooms?: Room[];
  cable?: string;
  // -----------------------
  progress?: MissionProgressStatus;
  sync?: MissionSyncStatus;
  totalDistance?: number;
  progressDistance?: number;
  workingUser?: string;
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
}
