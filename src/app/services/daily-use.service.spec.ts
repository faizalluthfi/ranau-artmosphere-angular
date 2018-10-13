import { TestBed } from '@angular/core/testing';

import { DailyUseService } from './daily-use.service';

describe('DailyUseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyUseService = TestBed.get(DailyUseService);
    expect(service).toBeTruthy();
  });
});
