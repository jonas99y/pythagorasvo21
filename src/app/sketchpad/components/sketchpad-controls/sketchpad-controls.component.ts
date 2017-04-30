import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sketchpad-controls',
  templateUrl: './sketchpad-controls.component.html',
  styleUrls: ['./sketchpad-controls.component.scss']
})
export class SketchpadControlsComponent implements OnInit {

  public colors: Array<string> = new Array<string>("red", "blue", "green", "yellow", "black", "white");

  @Output() lineColorUpdated = new EventEmitter<string>();
  @Output() lineSizeUpdated = new EventEmitter<number>();
  @Output() unDo = new EventEmitter();
  @Output() clear = new EventEmitter();

  // Fields
  private _lineColor: string;
  private _lineSize: number;
  // Properties
  get lineColor(): string {
    return this._lineColor;
  }
  set lineColor(value: string) {
    this._lineColor = value;
    this.lineColorUpdated.emit(this.lineColor);
  }

  get lineSize(): number {
    return this._lineSize;
  }
  set lineSize(value: number) {
    this._lineSize = value;
    this.lineSizeUpdated.emit(this.lineSize);
  }

  unDoClicked() {
    // console.log("undo clicked");
    this.unDo.emit();
  }

  clearClicked() {
    this.clear.emit();
  }

  constructor() {
    this.colors.forEach(color => {

    })
  }
  setColor(color: string) {
    this.lineColor = color;
  }
  decreasePenSize() {
    this.lineSize -= 2;
    if(this.lineSize<2)
    this.lineSize=2;
  }
  increasePenSize() {
    this.lineSize += 2;
    if(this.lineSize>100)
        this.lineSize=100;
  }
  ngOnInit() {

    //set default;
    this.lineSize = 5;
    this.lineColor = "black";
  }

}
