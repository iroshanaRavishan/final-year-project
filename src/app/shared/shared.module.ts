import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { FilterPipe } from './filter/filter.pipe';
import { SidebarModule } from 'ng-sidebar';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { OrderActionComponent } from './order-action/order-action.component';
import { environment } from 'src/environments/environment';
import { GooglePayButtonModule } from '@google-pay/button-angular';

@NgModule({
  declarations: [
    FilterPipe,
    OrderPreviewComponent,
    OrderActionComponent
  ],

  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    GooglePayButtonModule
  ],

  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],

  exports: [
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      FilterPipe,
    
  ],
})
export class SharedModule { }
