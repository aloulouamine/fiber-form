import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { MissionFormComponent } from './containers/mission-form/mission-form.component';
import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionEffects } from './effects/mission.effects';
import { MissionRoutingModule } from './mission-routing.module';
import * as fromTechMission from './reducers';



@NgModule({
  declarations: [MissionListComponent, MissionFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MissionRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromTechMission.TechMissionFeatureKey, fromTechMission.reducer),
    EffectsModule.forFeature([MissionEffects]),
  ]
})
export class MissionModule { }
