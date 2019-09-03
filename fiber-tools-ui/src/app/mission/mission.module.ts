import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { PictureInputComponent } from './mission-form/picture-input/picture-input.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [MissionListComponent, MissionFormComponent, PictureInputComponent],
  imports: [
    CommonModule,
    MissionRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule
  ]
})
export class MissionModule { }
