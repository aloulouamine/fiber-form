import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatDialogModule
  ],
  exports: [
    MatStepperModule,
    MatDialogModule
  ]
})
export class SharedModule { }
