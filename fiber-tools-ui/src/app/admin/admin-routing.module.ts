import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteListComponent } from './containers/site-list/site-list.component';
import { SiteCreateComponent } from './containers/site-create/site-create.component';
import { SiteEditComponent } from './containers/site-edit/site-edit.component';


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
