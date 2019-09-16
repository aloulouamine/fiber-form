import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private afa: AngularFireAuth, private router: Router) { }
  canActivate() {
    return this.afa.authState.pipe(map(user => user ? this.router.parseUrl('') : true));
  }
}
