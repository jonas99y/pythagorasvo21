import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfPythagorasComponent } from './history-of-pythagoras.component';

describe('HistoryOfPythagorasComponent', () => {
  let component: HistoryOfPythagorasComponent;
  let fixture: ComponentFixture<HistoryOfPythagorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfPythagorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfPythagorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
