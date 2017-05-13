import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login.component';
import {RegisterEmailComponent} from './components/register-email.component';
import {AuthGuard} from './services';

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule
  ],
  declarations: [
    LoginComponent,
    RegisterEmailComponent
  ],
  exports: [
    LoginComponent,
    RegisterEmailComponent
  ],
  providers: [AuthGuard]
})
export class AuthModule { }
