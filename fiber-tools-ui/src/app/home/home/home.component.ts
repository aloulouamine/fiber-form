import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private router: Router, private afa: AngularFireAuth) { }

  ngOnInit() {
    this.afa.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  signOut() {
    this.afa.auth.signOut();
    this.router.navigate(['/login']);
  }

}
