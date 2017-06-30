import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-before-after-slider',
  templateUrl: './before-after-slider.component.html',
  styleUrls: ['./before-after-slider.component.scss']
})
export class BeforeAfterSliderComponent implements OnInit {

  public Width =0;

  @Input() public Img1URL: string;
  @Input() public Img2URL: string;
  @Input() public ImgWidth: number;
  @Input() public ImgHeight: number;

  constructor() { }

  ngOnInit() {
  }

  SetRange(event) {
    this.Width = event.srcElement.value;

  }

}
