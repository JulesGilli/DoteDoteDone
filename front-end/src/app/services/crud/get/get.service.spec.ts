import { TestBed } from '@angular/core/testing';

import { GetService } from './get.service';
import {HttpClientModule} from '@angular/common/http';

describe('DataTestService', () => {
  let service: GetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
