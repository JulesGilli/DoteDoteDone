import { TestBed } from '@angular/core/testing';

import { PutService } from './put.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('PutService', () => {
  let service: PutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});



