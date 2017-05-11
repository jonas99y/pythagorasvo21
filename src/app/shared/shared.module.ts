import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopicService, ImageService} from './services/';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ImageService, TopicService]
})
export class SharedModule { }
