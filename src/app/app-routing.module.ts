import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmailComponent, LoginComponent, AuthGuard,LoginPhoneComponent } from './auth/';
import { DrawingComponent } from './drawing/drawing.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleImageComponent } from './single-image/single-image.component';
import { SettingsComponent } from './settings/settings.component';
import { MainGalleryComponent } from './main-gallery/main-gallery.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserFeedComponent, GroupFeedComponent } from './feed';
import { AboutComponent } from './about/about.component';
import { HistoryOfPythagorasComponent } from './history-of-pythagoras/history-of-pythagoras.component';
import { TopicOverviewComponent } from './topic-overview/topic-overview.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'feed', component: UserFeedComponent, canActivate: [AuthGuard] },
  { path: 'group-feed', component: GroupFeedComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register-email', component: RegisterEmailComponent },
  { path: 'login-phone', component: LoginPhoneComponent },
  { path: 'drawing', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: 'draw/topic/:topicKey', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: '✍️', component: DrawingComponent, canActivate: [AuthGuard] },
  { path: 'image/:imageKey', component: SingleImageComponent, canActivate: [AuthGuard] },
  { path: 'user/:userKey', component: UserViewComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: MainGalleryComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'history-of-pythagoras', component: HistoryOfPythagorasComponent },
  { path: 'topic/:topicKey', component: TopicOverviewComponent }
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
