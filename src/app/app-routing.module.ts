import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmailComponent, LoginEmailComponent, LoginComponent, AuthGuard } from './auth/';
import { DrawingComponent } from "./drawing/drawing.component";
import { ProfileComponent } from "./profile/profile.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-email', component: RegisterEmailComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'drawing', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
