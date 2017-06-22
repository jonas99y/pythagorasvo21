import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchpadImageUploadComponent } from './sketchpad-image-upload.component';

describe('SketchpadImageUploadComponent', () => {
  let component: SketchpadImageUploadComponent;
  let fixture: ComponentFixture<SketchpadImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketchpadImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketchpadImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
