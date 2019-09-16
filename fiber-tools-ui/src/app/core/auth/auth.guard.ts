import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afa: AngularFireAuth, private router: Router) { }
  canActivate() {
    return this.afa.authState.pipe(map(user => user ? true : this.router.parseUrl('/login')));
  }
}
