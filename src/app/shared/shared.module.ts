import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SharedModule { }
