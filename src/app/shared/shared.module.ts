import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService, ImageService, UserService, RatingService, CommentService, DBHelperService, GroupService } from './services/';
import { TestPipePipe, FindPipe } from './pipes/';
import { ImageViewerComponent, GalleryViewerComponent, CommentComponent } from './components';



@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule
  ],
  declarations: [TestPipePipe, FindPipe, ImageViewerComponent, GalleryViewerComponent, CommentComponent],
  exports: [TestPipePipe, FindPipe, ImageViewerComponent, GalleryViewerComponent, CommentComponent],
  providers: [ImageService, TopicService, UserService, RatingService, CommentService, DBHelperService, GroupService]
})
export class SharedModule { }
