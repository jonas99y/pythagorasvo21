import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-responsive-sketchpad-controls',
  templateUrl: './responsive-sketchpad-controls.component.html',
  styleUrls: ['./responsive-sketchpad-controls.component.scss']
})
export class ResponsiveSketchpadControlsComponent implements OnInit {



  @Output() lineColorUpdated = new EventEmitter<string>();
  @Output() lineSizeUpdated = new EventEmitter<number>();
  @Output() unDo= new EventEmitter();

  //Fields
  private _lineColor: string ;
  private _lineSize: number ;
  //Properties
  get lineColor():string {
    return this._lineColor;
  }
  set lineColor(value:string){
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

  unDoClicked()
  {
    console.log("undo clicked");
    this.unDo.emit();
  }

  constructor() {
    
   }

  ngOnInit() {
    //set default;
    this.lineSize = 5;
    this.lineColor = "black";
  }

}
