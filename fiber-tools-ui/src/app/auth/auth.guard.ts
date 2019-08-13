import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { auth } from 'firebase';
import { ReplaySubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    const result = new ReplaySubject<boolean>()
    auth().onAuthStateChanged(user => result.next(!!user));
    return result.asObservable().pipe(take(1), tap(isLogin => {
      if (!isLogin) {
        this.router.navigate(['/login']);
      }
    }));
  }
}
