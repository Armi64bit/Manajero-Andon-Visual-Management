import { TestBed } from '@angular/core/testing';

import { NotificationService  } from './notifications.service';

describe('NotificationService ', () => {
  let service: NotificationService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
