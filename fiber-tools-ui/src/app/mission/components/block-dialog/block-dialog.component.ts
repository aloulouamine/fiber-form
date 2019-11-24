import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-block-dialog',
  templateUrl: './block-dialog.component.html',
  styleUrls: ['./block-dialog.component.css']
})
export class BlockDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BlockDialogComponent>
  ) { }

  onSubmitComment(comment: Comment) {
    this.dialogRef.close(comment);
  }

}
