import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterEmailComponent} from './auth/components/register-email.component';
import {AuthGuard} from './auth/services/auth-guard.service';
import {LoginComponent} from './auth/components/login.component';
import {LoginEmailComponent} from './auth/components/login-email.component';
import {DrawingComponent} from './drawing/drawing.component';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-email', component: RegisterEmailComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'drawing', component: DrawingComponent, canActivate: [AuthGuard] }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
