import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
  ],
  declarations: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
