import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { InnerSiteComponent } from './inner-site/inner-site.component';

// creating inner path for routes of shop
const routes: Routes = [
  {path: '', pathMatch: 'full', component: ShopsComponent},
  {path: 'shops/:sid/:email', pathMatch: 'full', component: InnerSiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule { }
