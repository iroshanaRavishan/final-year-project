import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDataService } from '@core/products/product-data.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule
  ],
  providers: [
    ProductDataService
  ]
})
export class HomeModule { }
