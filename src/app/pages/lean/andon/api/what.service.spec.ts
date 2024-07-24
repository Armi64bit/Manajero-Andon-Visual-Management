import { TestBed } from '@angular/core/testing';

import { WhatService } from './what.service';

describe('WhatService', () => {
  let service: WhatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
