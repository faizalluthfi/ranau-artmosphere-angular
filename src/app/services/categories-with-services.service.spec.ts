import { TestBed } from '@angular/core/testing';

import { CategoriesWithServicesService } from './categories-with-services.service';

describe('CategoriesWithServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesWithServicesService = TestBed.get(CategoriesWithServicesService);
    expect(service).toBeTruthy();
  });
});
