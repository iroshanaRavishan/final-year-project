import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';
import { DesignersSignupComponent } from './designers-signup/designers-signup.component';
import { EditDesignerComponent } from './edit-designer/edit-designer.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ShopsSignupComponent } from './shops-signup/shops-signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';


const routes: Routes = [
      { path: '', component: LoginSignupComponent},
      { path: 'auth/signupsuccess', component: SignupSuccessComponent},
      { path: 'auth/designersignup', component: DesignersSignupComponent},
      { path: 'auth/shopssignup', component: ShopsSignupComponent },
      // { path: 'auth/designersignup/edit/id', component:  EditDesignerComponent},
      // { path: 'auth/designersignup/dashboard', component:  DashboardDesignerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
