import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PictureInputComponent } from './components/picture-input/picture-input.component';
import { MissionFormComponent } from './containers/mission-form/mission-form.component';
import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionEffects } from './effects/mission.effects';
import { MissionRoutingModule } from './mission-routing.module';
import * as fromMission from './reducers/mission.reducer';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MissionListComponent, MissionFormComponent, PictureInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    MissionRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(fromMission.missionFeatureKey, fromMission.reducer),
    EffectsModule.forFeature([MissionEffects]),
    MatProgressBarModule,
    MatSliderModule
  ]
})
export class MissionModule { }
