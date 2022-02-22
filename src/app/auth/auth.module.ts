import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { SharedModule } from '../shared/shared.module';
import { DesignersSignupComponent } from './designers-signup/designers-signup.component';
import { ShopsSignupComponent } from './shops-signup/shops-signup.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';




@NgModule({
  declarations: [
    LoginSignupComponent,
    SignupSuccessComponent,
    DesignersSignupComponent,
    ShopsSignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    Ng2PageScrollModule
  ]
})
export class AuthModule { }
