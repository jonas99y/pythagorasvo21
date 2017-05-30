import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService, ImageService, UserService, RatingService, CommentService, DBHelperService, GroupService } from './services/';
import { TestPipePipe, FindPipe } from './pipes/';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestPipePipe, FindPipe],
  exports: [TestPipePipe, FindPipe],
  providers: [ImageService, TopicService, UserService, RatingService, CommentService, DBHelperService, GroupService]
})
export class SharedModule { }
