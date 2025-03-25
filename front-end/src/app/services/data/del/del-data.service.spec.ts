import { TestBed } from '@angular/core/testing';

import { DelDataService } from './del-data.service';

describe('DelDataService', () => {
  let service: DelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
