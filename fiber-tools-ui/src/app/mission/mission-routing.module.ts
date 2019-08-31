import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionListComponent } from './mission-list/mission-list.component';


const routes: Routes = [
  { path: '', component: MissionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
