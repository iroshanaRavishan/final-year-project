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
import { ChangePassDesignerComponent } from './change-pass-designer/change-pass-designer.component';
import { AddProductDesignerComponent } from './add-product-designer/add-product-designer.component';
import { DashboardShopComponent } from './dashboard-shop/dashboard-shop.component';
import { AddProductShopComponent } from './add-product-shop/add-product-shop.component';
import { EditShopComponent } from './edit-shop/edit-shop.component';
import { ImageEditShopComponent } from './image-edit-shop/image-edit-shop.component';
import { ChangePassShopComponent } from './change-pass-shop/change-pass-shop.component';
import { AllSellsComponent } from './all-sells/all-sells.component';
import { UpdateSellsComponent } from './update-sells/update-sells.component';
import { UpdateItemsShopComponent } from './update-items-shop/update-items-shop.component';
import { AllItemsShopComponent } from './all-items-shop/all-items-shop.component';

@NgModule({
  declarations: [
    LoginSignupComponent,
    SignupSuccessComponent,
    DesignersSignupComponent,
    ShopsSignupComponent,
    EditDesignerComponent,
    DashboardDesignerComponent,
    LogoutPopupComponent,
    ImageEditDesignerComponent,
    ChangePassDesignerComponent,
    AddProductDesignerComponent,
    DashboardShopComponent,
    AddProductShopComponent,
    EditShopComponent,
    ImageEditShopComponent,
    ChangePassShopComponent,
    AllSellsComponent,
    UpdateSellsComponent,
    UpdateItemsShopComponent,
    AllItemsShopComponent
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
