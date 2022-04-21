import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignersComponent } from './designers/designers.component';
import { InnerSiteComponent } from './inner-site/inner-site.component';

// creating inner path for routes of shop
const routes: Routes = [
  {path: '', pathMatch: 'full', component: DesignersComponent},
  {path: 'designers/:id/:email', pathMatch: 'full', component: InnerSiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignersRoutingModule { }
