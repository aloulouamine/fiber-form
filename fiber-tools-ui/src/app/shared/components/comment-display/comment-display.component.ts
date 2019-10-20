import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { Comment } from 'src/app/core/models/mission';

@Component({
  selector: 'app-comment-display',
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.css']
})
export class CommentDisplayComponent implements OnInit {

  @Input() comment: Comment;

  get date(): Date {
    const timestamp = this.comment.createdAt as Timestamp;
    if (timestamp.toDate) {
      return timestamp.toDate();
    }
    return this.comment.createdAt as Date;
  }

  constructor() { }

  ngOnInit() {
  }

}
