import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule
  ],
  exports: [
    MatStepperModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule
  ]
})
export class SharedModule { }
