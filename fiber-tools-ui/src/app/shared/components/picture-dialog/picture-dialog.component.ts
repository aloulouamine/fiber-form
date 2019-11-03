import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Timestamp } from '@firebase/firestore-types';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-picture-dialog',
  templateUrl: './picture-dialog.component.html',
  styleUrls: ['./picture-dialog.component.css']
})
export class PictureDialogComponent implements OnInit, OnDestroy {

  originalUrl$ = new BehaviorSubject<string>('');
  unsubscribe$ = new Subject<void>();

  get date() {
    const d = this.data.date as Timestamp;
    return d && d.toDate();
  }

  constructor(
    private dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private afs: AngularFireStorage) { }

  ngOnInit() {
    if (this.data && this.data.url && this.data.url.includes('_original')) {
      this.afs.ref(this.data.url).getDownloadURL()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(url => this.originalUrl$.next(url))
    } else if (this.data && this.data.url) {
      this.originalUrl$.next(this.data.url);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
