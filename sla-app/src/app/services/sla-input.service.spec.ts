import { TestBed, inject } from '@angular/core/testing';

import { SlaInputService } from './sla-input.service';

describe('SlaInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlaInputService]
    });
  });

  it('should be created', inject([SlaInputService], (service: SlaInputService) => {
    expect(service).toBeTruthy();
  }));
});
