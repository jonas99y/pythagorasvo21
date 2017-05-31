import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopicService, ImageService, UserService, RatingService, CommentService, DBHelperService, GroupService } from './services/';
import { TestPipePipe, FindPipe } from './pipes/';
import { ImageViewerComponent, GalleryViewerComponent } from './components';



@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [TestPipePipe, FindPipe, ImageViewerComponent, GalleryViewerComponent],
  exports: [TestPipePipe, FindPipe, ImageViewerComponent, GalleryViewerComponent],
  providers: [ImageService, TopicService, UserService, RatingService, CommentService, DBHelperService, GroupService]
})
export class SharedModule { }
