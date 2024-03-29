import { TestBed } from '@angular/core/testing';

import { LocationTrackerService } from './location-tracker.service';

describe('LocationTrackerService', () => {
  let service: LocationTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
