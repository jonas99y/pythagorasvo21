import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterEmailComponent, LoginEmailComponent, LoginComponent, AuthGuard} from './auth/';
import {DrawingComponent} from './drawing/drawing.component';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-email', component: RegisterEmailComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'drawing', component: DrawingComponent, canActivate: [AuthGuard] }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
