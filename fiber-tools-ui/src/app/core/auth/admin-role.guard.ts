import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Roles } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate() {
    return this.userService.getCurrentUserRoles().pipe(
      map((r: Roles) => r.admin || r.supervisor ? true : this.router.parseUrl('/401'))
    );
  }
}
