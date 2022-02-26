import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FilterPipe
  ]
})
export class SharedModule { }
