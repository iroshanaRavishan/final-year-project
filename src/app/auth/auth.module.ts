import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginSignupComponent,
    SignupSuccessComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
