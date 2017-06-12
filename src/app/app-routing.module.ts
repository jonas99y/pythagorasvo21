import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmailComponent, LoginComponent, AuthGuard } from './auth/';
import { DrawingComponent } from './drawing/drawing.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleImageComponent } from './single-image/single-image.component';
import { SettingsComponent } from './settings/settings.component';
import { MainGalleryComponent } from './main-gallery/main-gallery.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FeedComponent } from './feed';
import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-email', component: RegisterEmailComponent },
  { path: 'drawing', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: '✍️', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: 'image/:imageKey', component: SingleImageComponent, canActivate: [AuthGuard] },
  { path: 'user/:userKey', component: UserViewComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: MainGalleryComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'feed', component: FeedComponent },
  { path: 'about', component: AboutComponent }


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
