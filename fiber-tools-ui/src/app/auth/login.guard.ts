import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate() {
    const result = new ReplaySubject<boolean>();
    auth().onAuthStateChanged(user => result.next(!user));
    return result.asObservable().pipe(take(1),
      tap(isNotLogin => {
        if (!isNotLogin) {
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
