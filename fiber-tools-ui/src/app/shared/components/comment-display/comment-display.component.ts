import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Comment } from 'src/app/core/models/mission';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-comment-display',
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.css']
})
export class CommentDisplayComponent implements OnInit, OnDestroy {

  @Input() comment: Comment;

  user: User;
  private unsubscribe$ = new Subject<void>();

  get date(): Date {
    const timestamp = this.comment.createdAt as Timestamp;
    if (timestamp.toDate) {
      return timestamp.toDate();
    }
    return this.comment.createdAt as Date;
  }

  get user$(): Observable<User> {
    if (this.comment && this.comment.user) {
      return this.userService.getUserByEmail(this.comment.user).pipe(take(1))
    }
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.user = data;
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
