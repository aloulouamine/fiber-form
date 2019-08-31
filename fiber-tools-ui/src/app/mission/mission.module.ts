import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MissionListComponent],
  imports: [
    CommonModule,
    MissionRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class MissionModule { }
