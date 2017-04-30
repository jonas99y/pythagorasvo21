import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sketchpad-brush-preview',
  templateUrl: './sketchpad-brush-preview.component.html',
  styleUrls: ['./sketchpad-brush-preview.component.scss']
})
export class SketchpadBrushPreviewComponent implements OnInit {

  private _color: string;
  private _size: number;


  @ViewChild('brushPreviewCanvas') canvas: HTMLCanvasElement;

  @Input('size') set size(size: number) {
    this._size = size;
    this.drawPreviewBursh();
  }

  @Input('color') set color(color: string) {
    this._color = color;
    this.drawPreviewBursh();
  }


  constructor() { }

  ngOnInit() {
  }

  drawPreviewBursh() {
    
  }
}
