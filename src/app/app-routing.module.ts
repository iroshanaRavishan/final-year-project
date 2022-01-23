import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup/login-signup.component';
import { ShopsComponent } from './pages/shops/shops.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent},
  { path: 'designers', component:DesignersComponent},
  { path: 'shops', component:ShopsComponent},
  { path: 'contactus', component:ContactUsComponent},
  { path: 'aboutus', component:AboutUsComponent},
  { path: 'loginsignup', component:LoginSignupComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
