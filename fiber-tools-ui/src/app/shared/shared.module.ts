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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CheckPointIconComponent } from './components/check-point-icon/check-point-icon.component';
@NgModule({
  declarations: [CheckPointIconComponent],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTableModule,
    MatTableModule,
    MatToolbarModule,
  ],
  exports: [
    //material
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTableModule,
    MatTableModule,
    MatToolbarModule,
    //components
    CheckPointIconComponent
  ]
})
export class SharedModule { }
