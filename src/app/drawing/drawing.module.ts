import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DrawingComponent} from './drawing.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DrawingComponent
  ],
  exports: [
    DrawingComponent
  ]
})
export class DrawingModule { }
