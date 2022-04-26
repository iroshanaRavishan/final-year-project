import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops/shops.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDataService } from '@core/products/product-data.service';
import { InnerSiteComponent } from './inner-site/inner-site.component';

@NgModule({
  declarations: [
    ShopsComponent,
    InnerSiteComponent
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    HttpClientModule,
    Ng2PageScrollModule
  ],
  providers: [
    ProductDataService
  ]
})
export class ShopsModule { }
