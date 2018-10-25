import { TestBed } from '@angular/core/testing';

import { ReportCategoryService } from './report-category.service';

describe('ReportCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportCategoryService = TestBed.get(ReportCategoryService);
    expect(service).toBeTruthy();
  });
});
