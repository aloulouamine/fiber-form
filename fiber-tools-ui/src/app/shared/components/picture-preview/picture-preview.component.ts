import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PictureDialogComponent } from '../picture-dialog/picture-dialog.component';

@Component({
  selector: 'app-picture-preview',
  templateUrl: './picture-preview.component.html',
  styleUrls: ['./picture-preview.component.css']
})
export class PicturePreviewComponent implements OnInit, OnChanges, OnDestroy {

  constructor(public dialog: MatDialog, public afs: AngularFireStorage) { }

  @Input() url: string;
  @Input() author;
  @Input() date;

  thumbnailUrl$ = new BehaviorSubject<string>('');

  unsubscribe$ = new Subject<void>();

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.url && this.url.includes('_original')) {
      const thumbUrl = this.url.replace('_original', '_original_200x200');
      this.afs.ref(thumbUrl).getDownloadURL().pipe(takeUntil(this.unsubscribe$),
        catchError(err => {
          if (err && err.code === 'storage/object-not-found') {
            return this.afs.ref(this.url).getDownloadURL();
          } else {
            return throwError(err);
          }
        }
        )
      ).subscribe(
        link => {
          this.thumbnailUrl$.next(link);
        }
      );
    } else {
      this.thumbnailUrl$.next(this.url);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }


  openDiag() {
    const dialogRef = this.dialog.open(PictureDialogComponent, {
      panelClass: 'picture-dialog-container',

      data: { url: this.url, author: this.author, date: this.date }
    });
  }

}
