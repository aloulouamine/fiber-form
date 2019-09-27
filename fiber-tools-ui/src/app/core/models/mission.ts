export interface Box {
  ref: string;
  type: BoxType;
}

export interface BoxLink {
  ref: string;
  distance: number;
  diameter: number;
}

export enum BoxType {
  AERIAL,
  UNDERGROUND
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
  site: string;
  enrollerNumah: string;
  type?: MissionType;
  boxes: Box[];
  links: BoxLink[];
  cable?: string;
  progress?: MissionProgressStatus;
  sync?: MissionSyncStatus;
  totalDistance?: number;
  progressDistance?: number;
  workingUser?: string;
  creator?: string;
  createDate?: Date;
  updateDate?: Date;
  comments: Comment[];
}
