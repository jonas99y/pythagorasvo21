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
  private changes: number = 0;


  @ViewChild('brushPreviewCanvas') refCanvas: ElementRef;

  @Input('size') set size(size: number) {
    this._size = size;
    this.show();
  }

  @Input('color') set color(color: string) {
    this._color = color;
    this.show();

  }
  public divDisplay: string = "none";

  constructor() { }

  ngOnInit() {
    this.canvas = this.refCanvas.nativeElement;
    this.drawPreviewBursh();
  }
  showDiv() {
    this.changes++;
    const that = this;
    this.divDisplay = "block";
    setTimeout(x => {
      that.changes--;
      if (that.changes == 0) {
        that.divDisplay = "none";
      };
    }, 1000);
  }

  show() {
    if (this.canvas === undefined) {
      return;
    }
    this.drawPreviewBursh();
    this.showDiv();
  }

  drawPreviewBursh() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    const canvasHeight: number = context.canvas.height;
    const canvasWidth: number = context.canvas.width;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX, centerY);
    context.lineWidth = this._size;
    context.strokeStyle = this._color;
    context.lineCap = "round";
    context.stroke();

  }
}
