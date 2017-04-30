import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DrawingComponent } from './drawing.component';
import { SketchpadModule } from '../sketchpad/sketchpad.module';

@NgModule({
  imports: [
    CommonModule,
    SketchpadModule,
    FormsModule
  ],
  declarations: [
    DrawingComponent
  ],
  exports: [
    DrawingComponent
  ]
})
export class DrawingModule { }
