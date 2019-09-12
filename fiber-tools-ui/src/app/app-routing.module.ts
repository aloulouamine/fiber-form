import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';

const redirectLoggedInToMission = redirectLoggedInTo([''])
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: 'mission',
        loadChildren: () => import('./mission/mission.module').then(mod => mod.MissionModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/mission'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToMission)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
