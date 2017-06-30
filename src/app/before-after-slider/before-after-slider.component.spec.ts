import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeAfterSliderComponent } from './before-after-slider.component';

describe('BeforeAfterSliderComponent', () => {
  let component: BeforeAfterSliderComponent;
  let fixture: ComponentFixture<BeforeAfterSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeAfterSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeAfterSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
