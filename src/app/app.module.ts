import { AppComponent } from './blocks/root/app.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FooterComponent } from './share-comp/footer/footer.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlocksModule } from './blocks/blocks.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ProductDataService } from '@core/products/product-data.service';

@NgModule({
  declarations: [
    DesignersComponent,
    ShopsComponent,
    AboutUsComponent,
    ContactUsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BlocksModule,
    AuthModule,
    ProductsModule,
    CoreModule,
  ],
  providers: [
    ProductDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
