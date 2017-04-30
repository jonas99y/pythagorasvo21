import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { DrawingModule } from './drawing/drawing.module';
import { RegisterEmailComponent } from './auth/components/register-email.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { LoginEmailComponent } from './auth/components/login-email.component';
import { LoginComponent } from './auth/components/login.component';
import { routes } from './app.routes';


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
    RegisterEmailComponent,
    LoginEmailComponent,
    LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DrawingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
