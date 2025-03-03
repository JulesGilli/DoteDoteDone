import { TestBed } from '@angular/core/testing';

import { DataTestService } from './crud.service';

describe('DataTestService', () => {
  let service: DataTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
