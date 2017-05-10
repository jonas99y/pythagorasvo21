import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopicService, DrawingService} from './services/';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DrawingService, TopicService]
})
export class SharedModule { }
