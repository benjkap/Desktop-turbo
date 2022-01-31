import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import {AuthGuard} from './service/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'profil',
    canActivate: [AuthGuard],
    component: ProfilComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminPanelComponent,
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
