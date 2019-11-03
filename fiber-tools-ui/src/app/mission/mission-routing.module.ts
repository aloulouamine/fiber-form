import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionFormComponent } from './containers/mission-form/mission-form.component';
import { MissionListResolver } from './containers/mission-list/mission-list.resolver';
import { MissionFormResolver } from './containers/mission-form/mission-form.resolver';


const routes: Routes = [
  { path: '', component: MissionListComponent },
  {
    path: ':id', component: MissionFormComponent,
    resolve: {
      missions: MissionListResolver,
      mission: MissionFormResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MissionListResolver, MissionFormResolver]
})
export class MissionRoutingModule { }
