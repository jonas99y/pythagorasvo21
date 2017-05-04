import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './topic-list/topic-list.component';
import {GalleryRoutingModule} from "./gallery-routing.module";
import { TopicComponent } from './topic/topic.component';

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule
  ],
  declarations: [TopicListComponent, TopicComponent]
})
export class GalleryModule { }
