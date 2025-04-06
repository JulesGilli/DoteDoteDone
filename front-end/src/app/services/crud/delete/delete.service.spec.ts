import { TestBed } from '@angular/core/testing';

import { DeleteService } from './delete.service';
import {HttpClientModule} from '@angular/common/http';

describe('DeleteService', () => {
  let service: DeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
