import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './root/app.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    AppComponent
  ],
  imports: [
    CommonModule,
    BlocksRoutingModule
  ], 
  exports: [HeaderComponent, AppComponent]
})
export class BlocksModule { }
