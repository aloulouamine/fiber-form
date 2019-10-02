import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SiteComponent } from './components/site/site.component';
import { SiteListComponent } from './containers/site-list/site-list.component';
import { StoreModule } from '@ngrx/store';
import * as adminReducer from './reducers'
import { EffectsModule } from '@ngrx/effects';
import { SiteEffects } from './effects/site.effects';
import { UserEffects } from './effects/user.effects';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { SiteCreateComponent } from './containers/site-create/site-create.component';
import { SiteEditComponent } from './containers/site-edit/site-edit.component';
import { SiteFormComponent } from './components/site-form/site-form.component';
import { SiteConfirmDeleteComponent } from './components/site-confirm-delete/site-confirm-delete.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature('admin', adminReducer.reducer),
    EffectsModule.forFeature([SiteEffects, UserEffects]),
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    SiteComponent,
    SiteListComponent,
    SiteCreateComponent,
    SiteEditComponent,
    SiteFormComponent,
    SiteConfirmDeleteComponent,
  ],
  entryComponents: [SiteConfirmDeleteComponent]
})
export class AdminModule { }
