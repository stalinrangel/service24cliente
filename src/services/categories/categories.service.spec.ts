import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';

describe('CacategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesService = TestBed.get(CategoriesService);
    expect(service).toBeTruthy();
  });
});
