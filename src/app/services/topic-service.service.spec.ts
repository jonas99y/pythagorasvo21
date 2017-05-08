import { TestBed, inject } from '@angular/core/testing';

import { TopicService } from './topic-service.service';

describe('TopicServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicService]
    });
  });

  it('should ...', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));
});
