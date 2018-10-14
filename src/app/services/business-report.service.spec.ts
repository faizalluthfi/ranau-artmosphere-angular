import { TestBed } from '@angular/core/testing';

import { BusinessReportService } from './business-report.service';

describe('BusinessReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessReportService = TestBed.get(BusinessReportService);
    expect(service).toBeTruthy();
  });
});
