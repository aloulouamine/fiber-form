import { Mission, MissionProgressStep } from './mission';

export interface AffectationDialogData {
  emails: string[];
  step: MissionProgressStep;
  touretInfo: Partial<Mission>;
}
