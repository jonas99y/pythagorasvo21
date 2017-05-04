import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sketchpad-colorselection',
  templateUrl: './sketchpad-colorselection.component.html',
  styleUrls: ['./sketchpad-colorselection.component.scss']
})
export class SketchpadColorselectionComponent implements OnInit {

  @Output() lineColorUpdated = new EventEmitter<string>();

  public colors: Array<string> = new Array<string>("red", "blue", "green", "yellow", "black", "white");

  private _lineColor: string;


  constructor() { }

  get lineColor(): string {
    return this._lineColor;
  }

  set lineColor(value: string) {
    this._lineColor = value;
    this.lineColorUpdated.emit(this.lineColor);
  }

  setColor(color: string) {
    this.lineColor = color;
  }


  ngOnInit() {
    this.lineColor = "black";
  }

}
