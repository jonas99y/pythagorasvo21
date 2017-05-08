import { TestBed, inject } from '@angular/core/testing';

import { DrawingService } from './drawing-service.service';

describe('DrawingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawingService]
    });
  });

  it('should ...', inject([DrawingService], (service: DrawingService) => {
    expect(service).toBeTruthy();
  }));
});
