import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignersRoutingModule } from './designers-routing.module';
import { DesignersComponent } from './designers/designers.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDataService } from '@core/products/product-data.service';

@NgModule({
  declarations: [
    DesignersComponent
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
