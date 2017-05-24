import { TestBed, inject } from '@angular/core/testing';

import { DBHelperService } from './db-helper.service';

describe('DBHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DBHelperService]
    });
  });

  it('should ...', inject([DBHelperService], (service: DBHelperService) => {
    expect(service).toBeTruthy();
  }));
});
