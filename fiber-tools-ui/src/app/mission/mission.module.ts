import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MissionFormComponent } from './containers/mission-form/mission-form.component';
import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionRoutingModule } from './mission-routing.module';
import { BlockDialogComponent } from './components/block-dialog/block-dialog.component';



@NgModule({
  declarations: [MissionListComponent, MissionFormComponent, BlockDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    MissionRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [BlockDialogComponent]
})
export class MissionModule { }
