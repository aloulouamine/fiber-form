import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SiteComponent } from './components/site/site.component';
import { SiteListComponent } from './containers/site-list/site-list.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [SiteComponent, SiteListComponent]
})
export class AdminModule { }
