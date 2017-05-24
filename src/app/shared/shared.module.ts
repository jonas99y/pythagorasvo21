import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService, ImageService, UserService, RatingService, CommentService, DBHelperService } from './services/';
import { TestPipePipe, FindUserPipe } from './pipes/';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestPipePipe, FindUserPipe],
  exports: [TestPipePipe, FindUserPipe],
  providers: [ImageService, TopicService, UserService, RatingService, CommentService, DBHelperService]
})
export class SharedModule { }
