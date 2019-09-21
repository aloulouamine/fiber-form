import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

const adminRole = 'ADMIN'

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) { }

  canActivate() {
    return this.afa.authState.pipe(
      mergeMap(user => this.userService.getUserByEmail(user.email)),
      map((user: User) => user.roles.indexOf(adminRole) >= 0 ? true : this.router.parseUrl('/401'))
    );
  }
}
