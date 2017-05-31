import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryViewerComponent } from './gallery-viewer.component';

describe('GalleryViewerComponent', () => {
  let component: GalleryViewerComponent;
  let fixture: ComponentFixture<GalleryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
