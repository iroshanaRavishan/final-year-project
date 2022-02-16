import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

const routes: Routes = [
  { path: '', component:LoginSignupComponent},
  { path: 'auth/signupsuccess', pathMatch:'full', component:SignupSuccessComponent} // this doesnt work///////////////////////////////////////////
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
