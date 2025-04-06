import { TestBed } from '@angular/core/testing';

import { DelDataService } from './del-data.service';
import {HttpClientModule} from '@angular/common/http';

describe('DelDataService', () => {
  let service: DelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
