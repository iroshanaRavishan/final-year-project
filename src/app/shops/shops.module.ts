import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops/shops.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDataService } from '@core/products/product-data.service';

@NgModule({
  declarations: [
    ShopsComponent
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductDataService
  ]
})
export class ShopsModule { }
