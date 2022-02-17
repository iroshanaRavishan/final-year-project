import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// creating path for routes
const routes: Routes = [
  { path: '', pathMatch:'full', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'designers', pathMatch:'full', loadChildren: () => import('./designers/designers.module').then(m => m.DesignersModule)},
  { path: 'shops', pathMatch:'full', loadChildren: () => import('./shops/shops.module').then(m => m.ShopsModule)},
  { path: 'auth', pathMatch:'full', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
