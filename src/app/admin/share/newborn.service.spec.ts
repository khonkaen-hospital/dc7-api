import { TestBed, inject } from '@angular/core/testing';

import { NewbornService } from './newborn.service';

describe('NewbornService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewbornService]
    });
  });

  it('should ...', inject([NewbornService], (service: NewbornService) => {
    expect(service).toBeTruthy();
  }));
});
