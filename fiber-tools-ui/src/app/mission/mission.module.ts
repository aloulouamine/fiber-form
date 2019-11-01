import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MissionFormComponent } from './containers/mission-form/mission-form.component';
import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionRoutingModule } from './mission-routing.module';



@NgModule({
  declarations: [MissionListComponent, MissionFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MissionRoutingModule,
    ReactiveFormsModule
  ]
})
export class MissionModule { }
