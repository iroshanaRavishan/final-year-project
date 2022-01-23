import { AppComponent } from './app.component';
import { HeaderComponent } from './share-comp/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup/login-signup.component';
import { FooterComponent } from './share-comp/footer/footer.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DesignersComponent,
    ShopsComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginSignupComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
