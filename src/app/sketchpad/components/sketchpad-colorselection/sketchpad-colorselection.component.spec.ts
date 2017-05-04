import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchpadColorselectionComponent } from './sketchpad-colorselection.component';

describe('SketchpadColorselectionComponent', () => {
  let component: SketchpadColorselectionComponent;
  let fixture: ComponentFixture<SketchpadColorselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketchpadColorselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketchpadColorselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
