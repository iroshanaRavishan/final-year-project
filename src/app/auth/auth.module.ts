import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { SharedModule } from '../shared/shared.module';
import { DesignersSignupComponent } from './designers-signup/designers-signup.component';
import { ShopsSignupComponent } from './shops-signup/shops-signup.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { EditDesignerComponent } from './edit-designer/edit-designer.component';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';
import { LogoutPopupComponent } from './logout-popup/logout-popup.component';
import { ImageEditDesignerComponent } from './image-edit-designer/image-edit-designer.component';




@NgModule({
  declarations: [
    LoginSignupComponent,
    SignupSuccessComponent,
    DesignersSignupComponent,
    ShopsSignupComponent,
    EditDesignerComponent,
    DashboardDesignerComponent,
    LogoutPopupComponent,
    ImageEditDesignerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    Ng2PageScrollModule,
    HttpClientModule
  ]
})
export class AuthModule { }
