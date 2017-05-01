import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sketchpad-brush-preview',
  templateUrl: './sketchpad-brush-preview.component.html',
  styleUrls: ['./sketchpad-brush-preview.component.scss']
})
export class SketchpadBrushPreviewComponent implements OnInit {

  private _color: string;
  private _size: number;
  private canvas: HTMLCanvasElement;


  @ViewChild('brushPreviewCanvas') refCanvas: ElementRef;

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
    this.canvas = this.refCanvas.nativeElement;
    this.drawPreviewBursh();
  }

  drawPreviewBursh() {
    if (this.canvas === undefined) {
      return;
    }
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = this._size / 2;
    const context: CanvasRenderingContext2D = this.canvas.getContext('2d');

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = this._color;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = this._color;
    context.stroke();
  }
}
