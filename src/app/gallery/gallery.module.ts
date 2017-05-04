import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './topic-list/topic-list.component';
import {GalleryRoutingModule} from "./gallery-routing.module";

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule
  ],
  declarations: [TopicListComponent]
})
export class GalleryModule { }
