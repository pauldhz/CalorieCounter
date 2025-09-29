import { TestBed } from '@angular/core/testing';

import { HttpRawLoaderService } from './http-raw-loader-service';

describe('HttpRawLoaderService', () => {
  let service: HttpRawLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRawLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
