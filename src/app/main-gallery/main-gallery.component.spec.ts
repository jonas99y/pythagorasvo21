import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGalleryComponent } from './main-gallery.component';

describe('MainGalleryComponent', () => {
  let component: MainGalleryComponent;
  let fixture: ComponentFixture<MainGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
