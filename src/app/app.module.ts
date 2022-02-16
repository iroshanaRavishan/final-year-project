import { AppComponent } from './blocks/root/app.component';
import { HomeComponent } from './pages/home/home.component';
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
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
