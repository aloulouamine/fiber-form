import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { PictureInputComponent } from './components/picture-input/picture-input.component';
import { MissionFormComponent } from './containers/mission-form/mission-form.component';
import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionEffects } from './effects/mission.effects';
import { MissionRoutingModule } from './mission-routing.module';
import * as fromMission from './reducers/mission.reducer';



@NgModule({
  declarations: [MissionListComponent, MissionFormComponent, PictureInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    MissionRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromMission.missionFeatureKey, fromMission.reducer),
    EffectsModule.forFeature([MissionEffects]),
  ]
})
export class MissionModule { }
