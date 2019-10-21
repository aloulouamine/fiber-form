import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PictureInputComponent } from '../picture-input/picture-input.component';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  @Input() disabled;

  @Output() send = new EventEmitter();

  @ViewChild('commentText', { static: true }) commentText: ElementRef<HTMLInputElement>;
  @ViewChild('pictureInput', { static: true }) pictureInput: PictureInputComponent;

  file: File;

  constructor() { }

  ngOnInit() {
  }

  addComment(comment) {
    this.send.next({ comment, file: this.file });
    this.commentText.nativeElement.value = '';
    this.pictureInput.clearPicture();
  }

  addFile(file: File) {
    this.file = file;
  }
}
