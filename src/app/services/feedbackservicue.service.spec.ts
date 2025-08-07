import { TestBed } from '@angular/core/testing';

import { FeedbackservicueService } from './feedbackservicue.service';

describe('FeedbackservicueService', () => {
  let service: FeedbackservicueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackservicueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
