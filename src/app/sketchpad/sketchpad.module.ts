import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SketchpadComponent } from './components/sketchpad/sketchpad.component';
import { SketchpadControlsComponent } from './components/sketchpad-controls/sketchpad-controls.component';
import { SketchpadBrushPreviewComponent } from './components/sketchpad-brush-preview/sketchpad-brush-preview.component';
import { SketchpadColorselectionComponent } from './components/sketchpad-colorselection/sketchpad-colorselection.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SketchpadComponent,
        SketchpadBrushPreviewComponent,
        SketchpadControlsComponent,
        SketchpadColorselectionComponent,
    ],
    exports: [
        SketchpadComponent,
        SketchpadBrushPreviewComponent,
        SketchpadControlsComponent,
        SketchpadColorselectionComponent
    ]
})
export class SketchpadModule { }
