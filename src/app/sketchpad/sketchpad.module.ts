import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SketchpadComponent } from './components/sketchpad/sketchpad.component';
import { SketchpadControlsComponent } from './components/sketchpad-controls/sketchpad-controls.component';
import { SketchpadBrushPreviewComponent } from './components/sketchpad-brush-preview/sketchpad-brush-preview.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SketchpadComponent,
        SketchpadBrushPreviewComponent,
        SketchpadControlsComponent,
    ],
    exports: [
        SketchpadComponent,
        SketchpadBrushPreviewComponent,
        SketchpadControlsComponent,
    ]
})
export class SketchpadModule { }
