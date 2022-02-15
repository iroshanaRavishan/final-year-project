import { AppComponent } from './blocks/root/app.component';
import { HeaderComponent } from './share-comp/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FooterComponent } from './share-comp/footer/footer.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthHeaderInterceptorService } from './interceptors/auth-header-interceptor.service';
import { BlocksModule } from './blocks/blocks.module';

@NgModule({
  declarations: [
    HomeComponent,
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
    BlocksModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
