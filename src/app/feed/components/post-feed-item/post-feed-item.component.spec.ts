import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedItemComponent } from './post-feed-item.component';

describe('PostFeedItemComponent', () => {
  let component: PostFeedItemComponent;
  let fixture: ComponentFixture<PostFeedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFeedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
