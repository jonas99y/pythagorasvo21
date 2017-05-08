import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topic } from './topic';
import { Drawing } from './drawing';
@NgModule({
    imports: [
        CommonModule,
        Topic,
        Drawing
    ],
    declarations: [Topic, Drawing]
})
export class ModelModule { }
