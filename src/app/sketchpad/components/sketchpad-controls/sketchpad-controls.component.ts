import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sketchpad-controls',
  templateUrl: './sketchpad-controls.component.html',
  styleUrls: ['./sketchpad-controls.component.scss']
})
export class SketchpadControlsComponent implements OnInit {


  @Output() lineSizeUpdated = new EventEmitter<number>();
  @Output() unDo = new EventEmitter();
  @Output() clear = new EventEmitter();

  // Fields
  private _lineSize: number;
  // Properties



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
    var start = new Date().getTime();
    var result = confirm("Wetsch das würkli lösche?");
    if (result == true || new Date().getTime() < start + 200)
      this.clear.emit();

  }

  constructor() {
  }

  decreasePenSize() {
    this.lineSize -= 2;
    if (this.lineSize < 2)
      this.lineSize = 2;
  }
  increasePenSize() {
    this.lineSize += 2;
    if (this.lineSize > 100)
      this.lineSize = 100;
  }
  ngOnInit() {

    //set default;
    this.lineSize = 5;

  }

}
