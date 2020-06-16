import { TestBed } from '@angular/core/testing';

import { GlobalBehaviorService } from './global-behavior.service';

describe('GlobalBehaviorService', () => {
  let service: GlobalBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
