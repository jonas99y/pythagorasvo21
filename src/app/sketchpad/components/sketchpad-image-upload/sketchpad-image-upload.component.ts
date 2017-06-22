import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sketchpad-image-upload',
  templateUrl: './sketchpad-image-upload.component.html',
  styleUrls: ['./sketchpad-image-upload.component.scss']
})
export class SketchpadImageUploadComponent implements OnInit {

  @ViewChild('imageCanvas') imageCanvas: ElementRef;
  private canvas: HTMLCanvasElement;
  private ctx;
  constructor() { }

  ngOnInit() {
    this.canvas= this.imageCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
}

  public selectedImage: any;

  selectedImageChanged(e) {
    const that = this;
    var reader = new FileReader();
    reader.onload = function (event:any) {
      var img = new Image();
      img.onload = function () {
        that.canvas.width = img.width;
        that.canvas.height = img.height;
        that.ctx.drawImage(img, 0, 0);
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }

}
