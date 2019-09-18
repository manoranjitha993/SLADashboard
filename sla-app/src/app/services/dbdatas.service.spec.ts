import { TestBed, inject } from '@angular/core/testing';

import { DbdatasService } from './dbdatas.service';

describe('DbdatasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbdatasService]
    });
  });

  it('should be created', inject([DbdatasService], (service: DbdatasService) => {
    expect(service).toBeTruthy();
  }));
});
