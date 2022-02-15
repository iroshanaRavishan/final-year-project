import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopsComponent } from './pages/shops/shops.component';

// creating path for routes
const routes: Routes = [
  { path: '', pathMatch:'full', component:HomeComponent},
  { path: 'products', pathMatch:'full', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  { path: 'auth', pathMatch:'full', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'designers', component:DesignersComponent},
  { path: 'shops', component:ShopsComponent},
  { path: 'contactus', component:ContactUsComponent},
  { path: 'aboutus', component:AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
