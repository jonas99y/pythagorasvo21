import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService, ImageService, UserService, RatingService, CommentService, DBHelperService, GroupService } from './services/';
import { TestPipePipe, FindPipe } from './pipes/';
import {
  ImageViewerComponent,
  GalleryViewerComponent,
  CommentComponent,
  RatingComponent,
  AddPostComponent,
  RequestTopicComponent
} from './components';






@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule
  ],
  declarations: [
    TestPipePipe,
    FindPipe,
    ImageViewerComponent,
    GalleryViewerComponent,
    CommentComponent,
    RatingComponent,
    RequestTopicComponent,
    AddPostComponent],
  exports: [
    TestPipePipe,
    FindPipe,
    ImageViewerComponent,
    GalleryViewerComponent,
    CommentComponent,
    RatingComponent,
    AddPostComponent,
    RequestTopicComponent,],
  providers: [
    ImageService,
    TopicService,
    UserService,
    RatingService,
    CommentService,
    DBHelperService,
    GroupService]

})
export class SharedModule { }
