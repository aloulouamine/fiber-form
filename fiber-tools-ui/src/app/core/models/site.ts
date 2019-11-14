import { Timestamp } from '@firebase/firestore-types';

export enum Provider {
  AXIONE = 'AXIONE',
  TDF = 'TDF'
}

export interface Site {
  id?: string;
  ref: string;
  nro: string;
  pm: string;
  version: string;
  provider: Provider;
  siteFromFilename: string;
  creationDate: Timestamp;
}
