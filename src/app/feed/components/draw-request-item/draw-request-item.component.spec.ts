import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawRequestItemComponent } from './draw-request-item.component';

describe('DrawRequestItemComponent', () => {
  let component: DrawRequestItemComponent;
  let fixture: ComponentFixture<DrawRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
