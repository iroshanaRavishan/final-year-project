import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderActionComponent } from './order-action/order-action.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';

const routes: Routes = [
  {path: 'shared/:sid/:type/:id', pathMatch: 'full', component: OrderPreviewComponent},
  {path: 'shared/:sid/:type/:id/confirmed/:quentity/:finalprice/:shippingfee', pathMatch: 'full', component: OrderActionComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
