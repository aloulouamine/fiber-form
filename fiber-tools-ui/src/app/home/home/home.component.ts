import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { User } from 'firebase';
import { UserService } from 'src/app/core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil, mergeMap, filter, map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User;

  loading = false;
  roles$ = this.userService.getCurrentUserRoles();
  unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private location: Location,
    private afa: AngularFireAuth,
    private userService: UserService
  ) { }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

  ngOnInit() {
    this.afa.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });


    this.roles$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (this.location.path()) { return; }
      if (r.supervisor || r.admin) {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['mission']);
      }
    });

    this.router.events.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading = false;
      }
    });

  }

  goBack(){
    this.location.back();
  }

  signOut() {
    this.afa.auth.signOut();
    this.router.navigate(['/login']);
  }

}
