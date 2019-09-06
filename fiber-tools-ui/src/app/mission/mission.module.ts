import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { PictureInputComponent } from './mission-form/picture-input/picture-input.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import * as fromMission from './reducers/mission.reducer'
import { EffectsModule } from '@ngrx/effects';
import { MissionEffects } from './effects/mission.effects';

@NgModule({
  declarations: [MissionListComponent, MissionFormComponent, PictureInputComponent],
  imports: [
    CommonModule,
    MissionRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(fromMission.missionFeatureKey, fromMission.reducer),
    EffectsModule.forFeature([MissionEffects])
  ]
})
export class MissionModule { }
