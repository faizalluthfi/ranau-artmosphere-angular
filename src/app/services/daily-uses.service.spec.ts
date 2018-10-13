import { TestBed } from '@angular/core/testing';

import { DailyUsesService } from './daily-uses.service';

describe('DailyUsesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyUsesService = TestBed.get(DailyUsesService);
    expect(service).toBeTruthy();
  });
});
