import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { SiteConfirmDeleteComponent } from './components/site-confirm-delete/site-confirm-delete.component';
import { SiteFormComponent } from './components/site-form/site-form.component';
import { SiteComponent } from './components/site/site.component';
import { SiteCreateComponent } from './containers/site-create/site-create.component';
import { SiteEditComponent } from './containers/site-edit/site-edit.component';
import { SiteListComponent } from './containers/site-list/site-list.component';
import { SiteMissionsComponent } from './containers/site-missions/site-missions.component';
import { SiteEffects } from './effects/site.effects';
import { UserEffects } from './effects/user.effects';
import * as adminReducer from './reducers';
import { EditMissionDialogComponent } from './components/edit-mission-dialog/edit-mission-dialog.component';
import { MissionReportComponent } from './containers/mission-report/mission-report.component';
import { EditUserComponent } from './containers/edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature('admin', adminReducer.reducer),
    EffectsModule.forFeature([SiteEffects, UserEffects])
  ],
  declarations: [
    SiteComponent,
    SiteListComponent,
    SiteCreateComponent,
    SiteEditComponent,
    SiteFormComponent,
    SiteConfirmDeleteComponent,
    SiteMissionsComponent,
    EditMissionDialogComponent,
    MissionReportComponent,
    EditUserComponent
  ],
  entryComponents: [SiteConfirmDeleteComponent, EditMissionDialogComponent]
})
export class AdminModule { }
