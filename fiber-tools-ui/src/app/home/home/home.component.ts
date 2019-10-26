import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  loading = false;

  constructor(private router: Router, private afa: AngularFireAuth) { }

  ngOnInit() {
    this.afa.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading = false;
      }
    });

  }

  signOut() {
    this.afa.auth.signOut();
    this.router.navigate(['/login']);
  }

}
