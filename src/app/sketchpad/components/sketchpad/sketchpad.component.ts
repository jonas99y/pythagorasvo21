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

  private scalingFactor: number = 10000;

  private activePath: Path;
  private paths: Array<Path> = new Array<Path>();
  private isDrawing: Boolean = false;
  public lineColor: string;
  public lineSize: number;

  private distanceTop: number;
  private distanceLeft: number;

  private lastCoords: Coord;

  private mouseup = new EventEmitter<MouseEvent>();
  private mousemove = new EventEmitter<MouseEvent>();
  private mousedown = new EventEmitter<MouseEvent>();
  private mouseleave = new EventEmitter<MouseEvent>();

  public canvasWidth: number;
  public canvasHeight: number;

  private touchMove = new EventEmitter<TouchEvent>();
  private touchEnd = new EventEmitter<TouchEvent>();
  private touchStart = new EventEmitter<TouchEvent>();
  private touchCancle = new EventEmitter<TouchEvent>();

  public canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  @ViewChild('mainCanvas') public mainCanvas: ElementRef;
  @ViewChild('topCanvas') public topCanvas: ElementRef;

  constructor() {

  }



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

  ngOnInit() {


    this.canvas = this.mainCanvas.nativeElement;
    this.canvasContext = this.canvas.getContext("2d");
    this.canvasHeight = this.canvas.clientHeight;
    this.canvasWidth = this.canvas.clientWidth;
    window.scrollTo(0, 0);
    this.distanceTop = this.canvas.getBoundingClientRect().top;
    this.distanceLeft = this.canvas.getBoundingClientRect().left;

    // console.log(this.canvas);
    this.mouseup.subscribe({
      next: event => { this.Up(); }
    });
    this.mouseleave.subscribe({
      next: event => { this.Up(); }
    });
    this.mousemove.subscribe({
      next: event => {
        console.log("mousemove");
        if (this.isDrawing) {
          this.DrawTo(this.getMousePosition(event));
        }
      }
    });
    this.mousedown.subscribe({
      next: event => { this.Down(); }
    });

    this.touchEnd.subscribe({
      next: event => { this.Up(); }
    });
    this.touchCancle.subscribe({
      next: event => { this.Up(); }
    });
    this.touchMove.subscribe({
      next: event => {
        // console.log("touchmove");
        this.Move();
        if (this.isDrawing) {
          this.DrawTo(this.getTouchPosition(event));
        }
      }
    });
    this.touchStart.subscribe({
      next: event => { this.Down(); }
    });


    // let width: number = window.innerWidth
    //   || document.documentElement.clientWidth
    //   || document.body.clientWidth;
    // width -= 20;
    // if (width > 800)
    //   width = 800;
    // this.canvasWidth = this.canvas.clientWidth;
    // this.canvasHeight = this.canvas.clientHeight;


  }

  private onResize(event) {
    // console.log("resize canvas");
    this.canvasHeight = this.canvas.clientHeight;
    this.canvasWidth = this.canvas.clientWidth;
    this.DrawPathsToCanvas(this.paths, this.canvas);
    // this.canvasWidth = this.canvas.clientWidth;
    // this.canvasHeight = this.canvas.clientHeight;
  }

  public Clear(canvas: HTMLCanvasElement) {
    this.paths = new Array<Path>();
    this.DrawPathsToCanvas(this.paths, this.canvas);
  }


  public UnDo() {
    // console.log("undo");
    this.paths.splice(-1, 1);
    this.DrawPathsToCanvas(this.paths, this.canvas);
  }

  public SetLineColor(color: string) {
    this.lineColor = color;
  }

  public SetLineSize(size: number) {
    this.lineSize = size;
  }

  private StartDrawingPath() {
    this.isDrawing = true;

    // this.activePath = new Path(this.lineSize, this.lineColor);
    // this.paths.push(this.activePath);
    this.StartNewStroke();
  }

  private DrawTo(xy: Coord) {
    // console.log("add drawing point: " + xy.x + " ; " + xy.y)
    // this.activePath.Strokes.push(new Stroke(xy));
    // this.DrawPathsToCanvas(this.paths, this.canvas);
    this.ExtendCurrentStroke(this.relativeToAbsoluteCordinates(xy));
  }

  private StopDrawingPath() {
    this.isDrawing = false;
  }

  private DrawPathsToCanvas(paths: Array<Path>, canvas: HTMLCanvasElement) {
    // console.log(this.paths);
    const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d');
    const canvasHeight: number = this.canvasHeight;
    const canvasWidth: number = this.canvasWidth;
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    this.paths.forEach(path => {

      this.drawSinglePathToCanvas(path, canvas);
    });
  }

  private drawSinglePathToCanvas(path: Path, canvas: HTMLCanvasElement) {
    const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d');
    // start the line
    canvasContext.beginPath();
    // start at first point of path
    if (path.Strokes.length === 0) {
      return;
    }
    canvasContext.moveTo(path.Strokes[0].coord.x, path.Strokes[0].coord.y);
    path.Strokes.forEach(stroke => {
      // get values of next point
      // console.log("uncalced strokeCords x is: " + stroke.coord.x)
      const strokeCords: Coord = this.relativeToAbsoluteCordinates(stroke.coord);
      // console.log("calced strokeCords x is: " + strokeCords.x);
      const x: number = strokeCords.x;
      const y: number = strokeCords.y;
      // draw form last point to current point
      canvasContext.lineTo(x, y);
      // move to current point
      canvasContext.moveTo(x, y);
    });
    // draw the actual path to the canvas
    // console.log(path.lineColor);
    canvasContext.strokeStyle = path.lineColor;
    canvasContext.lineWidth = path.lineWidth;

    canvasContext.lineCap = "round";

    canvasContext.stroke();
  }

  private StartNewStroke() {
    this.activePath = new Path(this.lineSize, this.lineColor);
    this.canvasContext.strokeStyle = this.lineColor;
    this.canvasContext.lineWidth = this.lineSize;
    this.canvasContext.lineCap = "round";
  }

  private ExtendCurrentStroke(coords: Coord) {
    this.canvasContext.moveTo(this.lastCoords.x, this.lastCoords.y);
    this.canvasContext.lineTo(coords.x, coords.y);
    this.canvasContext.stroke();
    this.lastCoords = coords;
  }

  private Move(){

  }
  private Up(){

  }
  private Down(){

  }

  private EndCurrentStroke() {
    this.paths.push(this.activePath);
    this.activePath =null;
  }

  private absoluteToRelativeCordinates(coords: Coord): Coord {
    const x = +((coords.x / this.canvas.clientWidth));
    const y = +((coords.y / this.canvas.clientHeight));
    // console.log("abs x is:" + coords.x + " relative x is:" + x);

    return new Coord(x, y);
  }

  private relativeToAbsoluteCordinates(coords: Coord): Coord {

    const x = +(coords.x * this.canvas.clientWidth);
    const y = +(coords.y * this.canvas.clientHeight);
    // console.log("rel x is:" + coords.x + " absolute x is:" + x);
    return new Coord(x, y);
  }

  /**
   * Return the x and y cordinates of a touch event
   * @param event
   */
  private getTouchPosition(event: TouchEvent): Coord {
    const y: number = event.changedTouches[0].pageY;
    const x: number = event.changedTouches[0].pageX;
    return this.getInCanvasCoords(new Coord(x, y), this.canvas);
  }


  /**
   * Return the x and y cordinates of a mouse event
   * @param event
   */
  private getMousePosition(event: MouseEvent): Coord {

    // console.log(event);
    const y: number = event.pageY;
    const x: number = event.pageX;
    // console.log("Mouse is at: " + x + " ; " + y);
    return this.getInCanvasCoords(new Coord(x, y), this.canvas);
  }

  private getInCanvasCoords(coords: Coord, canvas: HTMLCanvasElement): Coord {
    const x = coords.x - this.distanceLeft;
    const y = coords.y - this.distanceTop;
    // let x = coords.x - this.distanceLeft;
    // let y = coords.y - this.distanceTop;
    // const cord = new Coord(x,y);
    // console.log("mouse inside canvas is at:" + x + " ; " + y);
    return this.absoluteToRelativeCordinates(new Coord(x, y));
    // return new Coord(x, y);
  }


}
