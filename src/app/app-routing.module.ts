import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmailComponent, LoginComponent, AuthGuard } from './auth/';
import { DrawingComponent } from './drawing/drawing.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleImageComponent } from './single-image/single-image.component';
import { SettingsComponent } from './settings/settings.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-email', component: RegisterEmailComponent },
  { path: 'drawing', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: '✍️', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: 'image/:imageKey', component: SingleImageComponent },
  { path: 'user/:userKey', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent }


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
