import { Mission } from './mission';

export enum Planner {
  AXIONE = 'AXIONE',
  TDF = 'TDF'
}

export interface Site {
  ref: string;
  missions: Mission[];
  planner: Planner;
}
