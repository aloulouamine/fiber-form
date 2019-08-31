import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionFormComponent } from './mission-form/mission-form.component';


const routes: Routes = [
  { path: '', component: MissionListComponent },
  { path: ':id', component: MissionFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
