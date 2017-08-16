import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { DrawingModule } from './drawing/drawing.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { FeedModule} from './feed/feed.module';
import { SingleImageComponent } from './single-image/single-image.component';
import { SettingsComponent } from './settings/settings.component';
import { MainGalleryComponent } from './main-gallery/main-gallery.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AboutComponent } from './about/about.component';
import { HistoryOfPythagorasComponent } from './history-of-pythagoras/history-of-pythagoras.component';
import { BeforeAfterSliderComponent } from './before-after-slider/before-after-slider.component';
import { TopicOverviewComponent } from './topic-overview/topic-overview.component';

// import { FeedComponent} from './feed/components/feed/feed.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyBlr3XTiDLBlWGJrjVxeDNkmgxcliow7o4',
  authDomain: 'pythagorasvo21.firebaseapp.com',
  databaseURL: 'https://pythagorasvo21.firebaseio.com',
  projectId: 'pythagorasvo21',
  storageBucket: 'pythagorasvo21.appspot.com',
  messagingSenderId: '619142703590'
};

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SingleImageComponent,
    SettingsComponent,
    MainGalleryComponent,
    UserViewComponent,
    AboutComponent,
    HistoryOfPythagorasComponent,
    BeforeAfterSliderComponent,
    TopicOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    SharedModule,
    FeedModule,
    DrawingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


