import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteListComponent } from './containers/site-list/site-list.component';
import { SiteCreateComponent } from './containers/site-create/site-create.component';
import { SiteEditComponent } from './containers/site-edit/site-edit.component';
import { SiteMissionsComponent } from './containers/site-missions/site-missions.component';
import { MissionReportComponent } from './containers/mission-report/mission-report.component';


const routes: Routes = [
  {
    path: 'site',
    component: SiteListComponent
  },
  {
    path: 'site/create',
    component: SiteCreateComponent
  },
  {
    path: 'site/:id',
    component: SiteEditComponent
  },
  {
    path: 'site/:id/mission',
    component: SiteMissionsComponent
  },
  {
    path: 'site/:siteId/mission/:missionId',
    component: MissionReportComponent
  },
  {
    path: '**',
    redirectTo: 'site',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
