import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { DrawingModule } from './drawing/drawing.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';


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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    DrawingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    GalleryModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

