import { Component, OnInit } from '@angular/core';
import { auth, User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    })
  }

  signOut() {
    auth().signOut();
    this.router.navigate(['/login']);
  }

}
