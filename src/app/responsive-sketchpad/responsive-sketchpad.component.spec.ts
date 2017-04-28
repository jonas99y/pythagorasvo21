import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveSketchpadComponent } from './responsive-sketchpad.component';

describe('ResponsiveSketchpadComponent', () => {
  let component: ResponsiveSketchpadComponent;
  let fixture: ComponentFixture<ResponsiveSketchpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveSketchpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveSketchpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
