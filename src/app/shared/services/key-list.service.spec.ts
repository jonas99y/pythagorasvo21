import { TestBed, inject } from '@angular/core/testing';

import { KeyListService } from './key-list.service';

describe('KeyListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyListService]
    });
  });

  it('should ...', inject([KeyListService], (service: KeyListService) => {
    expect(service).toBeTruthy();
  }));
});
