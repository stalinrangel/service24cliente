import { TestBed } from '@angular/core/testing';

import { ObjetcserviceService } from './objetcservice.service';

describe('ObjetcserviceService', () => {
  let service: ObjetcserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetcserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
