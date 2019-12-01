import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminRoleGuard } from './core/auth/admin-role.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginGuard } from './core/auth/login.guard';
import { UnauthorizedComponent } from './core/components/unauthorized/unauthorized.component';
import { HomeComponent } from './home/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mission',
        loadChildren: () => import('./mission/mission.module').then(mod => mod.MissionModule)
      },
      {
        path: 'admin',
        canActivate: [AdminRoleGuard],
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
      },
      {
        path: '401',
        component: UnauthorizedComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
