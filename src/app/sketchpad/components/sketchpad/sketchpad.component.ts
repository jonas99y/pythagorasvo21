import { Component, OnInit, HostListener, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Stroke } from './model/stroke';
import { Path } from './model/path';
import { Coord } from './model/coord';
@Component({
  selector: 'app-sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss']
})
export class SketchpadComponent implements OnInit {

  @ViewChild('mainCanvas') public mainCanvasRef: ElementRef;
  @ViewChild('topCanvas') public topCanvasRef: ElementRef;

  private mainCanvas: HTMLCanvasElement;
  private topCanvas: HTMLCanvasElement;

  private mainCanvasContext: CanvasRenderingContext2D;
  private topCanvasContext: CanvasRenderingContext2D;

  private pathsRelative: Array<Path> = new Array<Path>();
  private pathsAbsolute: Array<Path> = new Array<Path>();
  private activePathAbsolute: Path;

  private distanceTop: number;
  private distanceLeft: number;

  private _isDrawing: boolean;
  /**** Properties ****/
  public get canvas(): HTMLCanvasElement {
    return this.topCanvas;
  }

  public canvasHeight: number;
  public canvasWidth: number;

  public lineWidth: number;
  public lineColor: string;

  /** Private Properties */


  private get IsDrawing(): boolean {
    return this._isDrawing;
  }
  private set IsDrawing(value: boolean) {
    if (value && !this._isDrawing) {
      this.StartNewPath();
    }
    if (!value && this._isDrawing) {
      this.FinishPath();
    }
    this._isDrawing = value;
  }

  /**** InputEvents ****/
  private mouseup = new EventEmitter<MouseEvent>();
  private mousemove = new EventEmitter<MouseEvent>();
  private mousedown = new EventEmitter<MouseEvent>();
  private mouseleave = new EventEmitter<MouseEvent>();
  private touchMove = new EventEmitter<TouchEvent>();
  private touchEnd = new EventEmitter<TouchEvent>();
  private touchStart = new EventEmitter<TouchEvent>();
  private touchCancle = new EventEmitter<TouchEvent>();

  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent) { this.mouseup.emit(event); }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) { this.mouseleave.emit(event); }

  @HostListener('mousedown', ['$event'])
  onmousedown(event: MouseEvent) { this.mousedown.emit(event); }

  @HostListener('mousemove', ['$event'])
  onmousemove(event: MouseEvent) { this.mousemove.emit(event); }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) { event.preventDefault(); this.touchEnd.emit(event); }

  @HostListener('touchcancle', ['$event'])
  onTouchCancle(event: TouchEvent) { event.preventDefault(); this.touchCancle.emit(event); }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) { event.preventDefault(); this.touchStart.emit(event); }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) { event.preventDefault(); this.touchMove.emit(event); }

  onResize(event) {
    const that: this = this;
    setTimeout(x => {
      that.SetCanvasDistance();
      that.SetCanvasSize();
      that.RedrawCanvas(this.mainCanvasContext, this.GetAbsolutePathArray(this.pathsRelative, this.canvasWidth, this.canvasHeight));
    }, 500);
  }

  ngOnInit(): void {


    this.mouseup.subscribe({
      next: event => { this.IsDrawing = false; }
    });
    this.mouseleave.subscribe({
      next: event => { this.IsDrawing = false; }
    });
    this.mousemove.subscribe({
      next: event => {
        if (this.IsDrawing) {
          this.AddPointToActivePath(this.GetCoordsFromMouseEvent(event));
        };
      }
    });
    this.mousedown.subscribe({
      next: event => { this.IsDrawing = true; }
    });

    this.touchEnd.subscribe({
      next: event => { this.IsDrawing = false; }
    });
    this.touchCancle.subscribe({
      next: event => { this.IsDrawing = false; }
    });
    this.touchMove.subscribe({
      next: event => { this.AddPointToActivePath(this.GetCoordsFromTouchEvent(event)) }
    });
    this.touchStart.subscribe({
      next: event => { this.IsDrawing = true; }
    });
    this.topCanvas = this.topCanvasRef.nativeElement;
    this.mainCanvas = this.mainCanvasRef.nativeElement;

    this.mainCanvasContext = this.mainCanvas.getContext('2d');
    this.topCanvasContext = this.topCanvas.getContext('2d');

    this.SetCanvasSize();

    this.SetCanvasDistance();
  }
  constructor() {

  }

  /**** Public Functions ****/
  public SetLineColor(lineColor: string) {
    this.lineColor = lineColor;
  }

  public SetLineSize(lineSize: number) {
    this.lineWidth = lineSize;
  }

  public Clear() {
    this.pathsRelative = new Array<Path>();
    this.pathsAbsolute = new Array<Path>();
    this.ClearCanvas(this.mainCanvasContext);
  }
  public UnDo() {
    this.pathsRelative.splice(-1, 1);
    this.pathsAbsolute.splice(-1, 1);
    this.RedrawCanvas(this.mainCanvasContext, this.pathsAbsolute);
  }

  /**** Private Functions ****/
  private StartNewPath() {
    this.activePathAbsolute = new Path(this.lineWidth, this.lineColor);
  }

  private AddPointToActivePath(coord: Coord) {

    this.activePathAbsolute.Strokes.push(new Stroke(coord));
    this.RedrawCanvas(this.topCanvasContext, [this.activePathAbsolute]);
  }

  private FinishPath() {
    this.pathsAbsolute.push(this.activePathAbsolute);
    this.pathsRelative.push(this.GetRelativePath(this.activePathAbsolute, this.canvasWidth, this.canvasHeight));
    this.DrawPathToCanvas(this.mainCanvasContext, this.activePathAbsolute);
    this.ClearCanvas(this.topCanvasContext);

  }

  private GetCoordsFromMouseEvent(event: MouseEvent) {
    const y: number = event.pageY - this.distanceTop;
    const x: number = event.pageX - this.distanceLeft;
    return new Coord(x, y);
  }

  private GetCoordsFromTouchEvent(event: TouchEvent) {
    const y: number = event.changedTouches[0].pageY - this.distanceTop;
    const x: number = event.changedTouches[0].pageX - this.distanceLeft;
    return new Coord(x, y);
  }


  private SetCanvasSize() {
    this.canvasHeight = this.mainCanvas.clientHeight;
    this.canvasWidth = this.mainCanvas.clientWidth;
  }

  private SetCanvasDistance() {
    this.distanceTop = document.body.scrollTop + this.canvas.getBoundingClientRect().top;
    this.distanceLeft = document.body.scrollLeft + this.canvas.getBoundingClientRect().left;

  }


  private DrawPathToCanvas(canvasContext: CanvasRenderingContext2D, path: Path) {
    canvasContext.beginPath();
    // start at first point of path
    if (path.Strokes.length === 0) {
      return;
    }
    canvasContext.moveTo(path.Strokes[0].coord.x, path.Strokes[0].coord.y);
    path.Strokes.forEach(stroke => {
      // draw form last point to current point
      canvasContext.lineTo(stroke.coord.x, stroke.coord.y);
      // move to current point
      canvasContext.moveTo(stroke.coord.x, stroke.coord.y);
    });
    canvasContext.strokeStyle = path.lineColor;
    canvasContext.lineWidth = path.lineWidth;
    canvasContext.lineCap = "round";
    canvasContext.stroke();
  }

  private RedrawCanvas(canvasContext: CanvasRenderingContext2D, paths: Array<Path>) {
    this.ClearCanvas(canvasContext);
    paths.forEach(path => {
      this.DrawPathToCanvas(canvasContext, path);
    });
  }


  private ClearCanvas(canvasContext: CanvasRenderingContext2D) {
    const canvasHeight: number = canvasContext.canvas.height;
    const canvasWidth: number = canvasContext.canvas.width;
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

  }


  private GetAbsolutePathArray(paths: Array<Path>, xFactor: number, yFactor: number): Array<Path> {
    const newPaths: Array<Path> = new Array<Path>();
    paths.forEach(path => {
      newPaths.push(this.GetAbsolutePath(path, xFactor, yFactor));
    });

    return newPaths;
  }
  private GetAbsolutePath(path: Path, xFactor: number, yFactor: number): Path {
    const newPath: Path = new Path(path.lineWidth, path.lineColor);
    path.Strokes.forEach(stroke => {
      newPath.Strokes.push(this.GetAbsoluteStroke(stroke, xFactor, yFactor));
    });

    return newPath;
  }
  private GetAbsoluteStroke(stroke: Stroke, xFactor: number, yFactor: number): Stroke {
    const newX: number = stroke.coord.x * xFactor;
    const newY: number = stroke.coord.y * yFactor;
    const newCoord: Coord = new Coord(newX, newY);
    const newStroke: Stroke = new Stroke(newCoord);
    return newStroke;
  }
  private GetRelativePathArray(paths: Array<Path>, xDivider: number, yDivider: number): Array<Path> {
    const newPaths: Array<Path> = new Array<Path>();
    paths.forEach(path => {
      newPaths.push(this.GetRelativePath(path, xDivider, yDivider));
    });

    return newPaths;
  }
  private GetRelativePath(path: Path, xDivider: number, yDivider: number): Path {
    const newPath: Path = new Path(path.lineWidth, path.lineColor);
    path.Strokes.forEach(stroke => {
      newPath.Strokes.push(this.GetRelativeStroke(stroke, xDivider, yDivider));
    });

    return newPath;
  }
  private GetRelativeStroke(stroke: Stroke, xDivider: number, yDivider: number): Stroke {
    const newX: number = stroke.coord.x / xDivider;
    const newY: number = stroke.coord.y / yDivider;
    const newCoord: Coord = new Coord(newX, newY);
    const newStroke: Stroke = new Stroke(newCoord);
    return newStroke;
  }
}
