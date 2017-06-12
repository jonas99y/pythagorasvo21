import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFeedItemComponent } from './image-feed-item.component';

describe('ImageFeedItemComponent', () => {
  let component: ImageFeedItemComponent;
  let fixture: ComponentFixture<ImageFeedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFeedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
