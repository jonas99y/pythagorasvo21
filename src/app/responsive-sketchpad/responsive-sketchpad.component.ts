import { Component, OnInit, HostListener, EventEmitter, Input } from '@angular/core';
import { Stroke } from './stroke';
import { Path } from './path';
import { Coord } from './coord';
@Component({
  selector: 'app-responsive-sketchpad',
  templateUrl: './responsive-sketchpad.component.html',
  styleUrls: ['./responsive-sketchpad.component.scss']
})
export class ResponsiveSketchpadComponent implements OnInit {
  
  private activePath: Path;
  private paths: Array<Path> = new Array<Path>();
  private isDrawing: Boolean = false;
  private lineColor: string;
  private lineSize: number;

  public canvas: HTMLCanvasElement;
  private mouseup = new EventEmitter<MouseEvent>();
  private mousemove = new EventEmitter<MouseEvent>();
  private mousedown = new EventEmitter<MouseEvent>();
  private mouseleave = new EventEmitter<MouseEvent>();

  private touchMove = new EventEmitter<TouchEvent>();
  private touchEnd = new EventEmitter<TouchEvent>();
  private touchStart = new EventEmitter<TouchEvent>();
  private touchCancle = new EventEmitter<TouchEvent>();
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

    this.mouseup.subscribe({
      next: event => { this.StopDrawingPath(); }
    });
    this.mouseleave.subscribe({
      next: event => { this.StopDrawingPath(); }
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
      next: event => { this.StartDrawingPath(); }
    });

    this.touchEnd.subscribe({
      next: event => { this.StopDrawingPath(); }
    });
    this.touchCancle.subscribe({
      next: event => { this.StopDrawingPath(); }
    });
    this.touchMove.subscribe({
      next: event => {
        console.log("touchmove");
        if (this.isDrawing) {
          this.DrawTo(this.getTouchPosition(event));
        }
      }
    });
    this.touchStart.subscribe({
      next: event => { this.StartDrawingPath(); }
    });

    let el = document.getElementById('sketchpad') as HTMLCanvasElement;
    // Create a canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', '300px');
    this.canvas.setAttribute('height', '300px');
    this.canvas.style.width = '300px';
    this.canvas.style.height = '300px';
    el.appendChild(this.canvas);

  }




  public UnDo() {
    console.log("undo");
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
    console.log("Start Drawing")
    this.isDrawing = true;

    this.activePath = new Path(this.lineSize, this.lineColor);
    this.paths.push(this.activePath);

  }

  private DrawTo(xy: Coord) {
    console.log("Draw..")
    this.activePath.Strokes.push(new Stroke(xy));
    this.DrawPathsToCanvas(this.paths, this.canvas);
  }

  private StopDrawingPath() {
    console.log(this.paths);
    this.isDrawing = false;
  }

  private DrawPathsToCanvas(paths: Array<Path>, canvas: HTMLCanvasElement) {
    const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d');
    const canvasHeight: number = this.canvas.height;
    const canvasWidth: number = this.canvas.width;


    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    this.paths.forEach(path => {
      // start the line
      canvasContext.beginPath();

      // start at first point of path
      if (path.Strokes.length === 0) {
        return;
      }
      canvasContext.moveTo(path.Strokes[0].coord.x, path.Strokes[0].coord.y);
      path.Strokes.forEach(stroke => {
        // get values of next point
        const x: number = stroke.coord.x;
        const y: number = stroke.coord.y;
        // draw form last point to current point
        canvasContext.lineTo(x, y);
        // move to current point
        canvasContext.moveTo(x, y);

      });

      // draw the actual path to the canvas
      console.log(path.lineColor);
      canvasContext.strokeStyle = path.lineColor;
      canvasContext.lineWidth = path.lineWidth;

      canvasContext.lineCap = "round";

      canvasContext.stroke();
    });
  }

  private absoluteToRelativeCordinates(xy: [number, number], canvas: HTMLCanvasElement): [number, number] {
    const x: number = xy[0] / canvas.width;
    const y: number = xy[1] / canvas.height;
    return [x, y];
  }

  private relativeToAbsoluteCordinates(coord: Coord, canvas: HTMLCanvasElement): Coord {
    const x: number = coord.x * canvas.width;
    const y: number = coord.y * canvas.height;
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


    const y: number = event.pageY;
    const x: number = event.pageX;
    return this.getInCanvasCoords(new Coord(x, y), this.canvas);
  }

  private getInCanvasCoords(coords: Coord, canvas: HTMLCanvasElement): Coord {
    let rect = this.canvas.getBoundingClientRect();
    return new Coord(coords.x - rect.left, coords.y - rect.top);
  }


}
