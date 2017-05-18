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
import { GalleryModule } from './gallery/gallery.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { CommentComponent } from './comment/comment.component';
import { RatingComponent } from './rating/rating.component';
import { SingleImageComponent } from './single-image/single-image.component';
import { SettingsComponent } from './settings/settings.component';


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
    ImageViewerComponent,
    CommentComponent,
    RatingComponent,
    SingleImageComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    SharedModule,
    DrawingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    GalleryModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


