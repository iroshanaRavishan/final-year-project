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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SignupSuccessComponent } from './pages/signup-success/signup-success.component';
import { AuthHeaderInterceptorService } from './interceptors/auth-header-interceptor.service';



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
    SignupSuccessComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
