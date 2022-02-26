import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignersSignupComponent } from './designers-signup/designers-signup.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ShopsSignupComponent } from './shops-signup/shops-signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';


const routes: Routes = [
      { path: '', component: LoginSignupComponent},
      { path: 'auth/signupsuccess', component: SignupSuccessComponent},
      { path: 'auth/designersignup', component: DesignersSignupComponent},
      { path: 'auth/shopssignup', component: ShopsSignupComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
