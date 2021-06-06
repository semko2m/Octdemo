import { TestBed } from '@angular/core/testing';

import { HttpClientOctimineService } from './http-client-octimine.service';

describe('HttpClientOctimineService', () => {
  let service: HttpClientOctimineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientOctimineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
