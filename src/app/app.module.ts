import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';


import { AppComponent } from './app.component';
import {DrawingComponent} from './drawing/drawing.component';
import {ResponsiveSketchpadComponent} from './responsive-sketchpad/responsive-sketchpad.component';
import {ResponsiveSketchpadControlsComponent} from './responsive-sketchpad-controls/responsive-sketchpad-controls.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBlr3XTiDLBlWGJrjVxeDNkmgxcliow7o4",
    authDomain: "pythagorasvo21.firebaseapp.com",
    databaseURL: "https://pythagorasvo21.firebaseio.com",
    projectId: "pythagorasvo21",
    storageBucket: "pythagorasvo21.appspot.com",
    messagingSenderId: "619142703590"
};



@NgModule({
  declarations: [
    AppComponent,
    DrawingComponent,
    ResponsiveSketchpadComponent,
    ResponsiveSketchpadControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
