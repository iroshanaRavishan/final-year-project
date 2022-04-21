import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignersRoutingModule } from './designers-routing.module';
import { DesignersComponent } from './designers/designers.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDataService } from '@core/products/product-data.service';
import { InnerSiteComponent } from './inner-site/inner-site.component';

@NgModule({
  declarations: [
    DesignersComponent,
    InnerSiteComponent
  ],
  imports: [
    CommonModule,
    DesignersRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductDataService
  ]
})
export class DesignersModule { }
