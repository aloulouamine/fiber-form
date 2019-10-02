import { Mission } from './mission';

export enum Planner {
  AXIONE = 'AXIONE',
  TDF = 'TDF'
}

export interface Site {
  id: string;
  ref: string;
  missions: Mission[];
  planner: Planner;
}
