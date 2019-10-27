import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PictureDialogComponent } from '../picture-dialog/picture-dialog.component';

@Component({
  selector: 'app-picture-preview',
  templateUrl: './picture-preview.component.html',
  styleUrls: ['./picture-preview.component.css']
})
export class PicturePreviewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input() url;
  @Input() author;
  @Input() date;

  ngOnInit() {
  }

  openDiag() {
    const dialogRef = this.dialog.open(PictureDialogComponent, {
      panelClass: 'picture-dialog-container',

      data: { url: this.url, author: this.author, date: this.date }
    });
  }

}
