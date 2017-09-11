import { TestBed, inject } from '@angular/core/testing';

import { HisService } from './his.service';

describe('HisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HisService]
    });
  });

  it('should ...', inject([HisService], (service: HisService) => {
    expect(service).toBeTruthy();
  }));
});
