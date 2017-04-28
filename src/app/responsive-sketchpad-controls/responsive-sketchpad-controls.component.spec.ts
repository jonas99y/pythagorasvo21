import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveSketchpadControlsComponent } from './responsive-sketchpad-controls.component';

describe('ResponsiveSketchpadControlsComponent', () => {
  let component: ResponsiveSketchpadControlsComponent;
  let fixture: ComponentFixture<ResponsiveSketchpadControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveSketchpadControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveSketchpadControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
