import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleImageComponent } from './single-image.component';

describe('SingleImageComponent', () => {
  let component: SingleImageComponent;
  let fixture: ComponentFixture<SingleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
