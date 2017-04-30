import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveSketchpadBrushPreviewComponent } from './sketchpad-brush-preview.component';

describe('ResponsiveSketchpadBrushPreviewComponent', () => {
  let component: ResponsiveSketchpadBrushPreviewComponent;
  let fixture: ComponentFixture<ResponsiveSketchpadBrushPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveSketchpadBrushPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveSketchpadBrushPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
