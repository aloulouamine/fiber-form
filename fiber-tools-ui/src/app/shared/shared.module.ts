import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CheckPointIconComponent } from './components/check-point-icon/check-point-icon.component';
import { MissionsTableComponent } from './components/missions-table/missions-table.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentDisplayComponent } from './components/comment-display/comment-display.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';
import { PictureInputComponent } from './components/picture-input/picture-input.component';

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTableModule,
  MatToolbarModule,
];

const DECLARATIONS = [
  CheckPointIconComponent,
  MissionsTableComponent,
  CommentDisplayComponent,
  CommentEditComponent,
  PictureInputComponent
];
@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // material
    ...MATERIAL_MODULES
  ],
  exports: [
    ReactiveFormsModule,
    // material
    ...MATERIAL_MODULES,
    // components
    ...DECLARATIONS
  ]
})
export class SharedModule { }
