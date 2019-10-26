import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionFormComponent } from './containers/mission-form/mission-form.component';
import { MissionListResolver } from './containers/mission-list/mission-list.resolver';


const routes: Routes = [
  { path: '', component: MissionListComponent, resolve: { missions: MissionListResolver } },
  { path: ':id', component: MissionFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MissionListResolver]
})
export class MissionRoutingModule { }
