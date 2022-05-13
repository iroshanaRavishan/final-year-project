import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';
import { DesignersSignupComponent } from './designers-signup/designers-signup.component';
import { EditDesignerComponent } from './edit-designer/edit-designer.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ShopsSignupComponent } from './shops-signup/shops-signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { UpdateItemsShopComponent } from './update-items-shop/update-items-shop.component';
import { UpdateSellsComponent } from './update-sells/update-sells.component';


const routes: Routes = [
      { path: '', component: LoginSignupComponent},
      { path: 'auth/signupsuccess', component: SignupSuccessComponent},
      { path: 'auth/registersuccess/:username', component: RegisterSuccessComponent},
      { path: 'auth/designersignup', component: DesignersSignupComponent},
      { path: 'auth/shopssignup', component: ShopsSignupComponent },
      { path: 'auth/shopsignup/editsells/:id', component: UpdateSellsComponent},
      { path: 'auth/shopsignup/edititem/:sid/:id', component:  UpdateItemsShopComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
