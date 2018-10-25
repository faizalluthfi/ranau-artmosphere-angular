import { TestBed } from '@angular/core/testing';

import { ReportCategoriesService } from './report-categories.service';

describe('ReportCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportCategoriesService = TestBed.get(ReportCategoriesService);
    expect(service).toBeTruthy();
  });
});
