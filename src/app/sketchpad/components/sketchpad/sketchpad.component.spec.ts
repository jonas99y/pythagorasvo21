import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchpadComponent } from './sketchpad.component';

describe('ResponsiveSketchpadComponent', () => {
  let component: SketchpadComponent;
  let fixture: ComponentFixture<SketchpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketchpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketchpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
