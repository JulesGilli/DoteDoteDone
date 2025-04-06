import { TestBed } from '@angular/core/testing';

import { PostDataService } from './post-data.service';
import {HttpClientModule} from '@angular/common/http';

describe('PostDataService', () => {
  let service: PostDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PostDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
