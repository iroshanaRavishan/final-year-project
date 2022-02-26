import { AppComponent } from './blocks/root/app.component';
import { FooterComponent } from './share-comp/footer/footer.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlocksModule } from './blocks/blocks.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ProductDataService } from '@core/products/product-data.service';
import { ShopsModule } from './shops/shops.module';
import { DesignersModule } from './designers/designers.module';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BlocksModule,
    AuthModule,
    ShopsModule,
    DesignersModule,
    CoreModule,
  ],
  providers: [
    ProductDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
