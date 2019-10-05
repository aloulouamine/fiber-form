import { Timestamp } from '@firebase/firestore-types';

export enum Planner {
  AXIONE = 'AXIONE',
  TDF = 'TDF'
}

export interface Site {
  id?: string;
  ref: string;
  planner: Planner;
  siteFromFilename: string;
  creationDate: Timestamp;
}
