import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService, ImageService, UserService, RatingService } from './services/';
import { TestPipePipe } from './pipes/test-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestPipePipe],
  exports: [TestPipePipe],
  providers: [ImageService, TopicService, UserService]
})
export class SharedModule { }
