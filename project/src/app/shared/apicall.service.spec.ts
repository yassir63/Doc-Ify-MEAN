import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApicallService } from './apicall.service';

describe('ApicallService', () => {
  let service: ApicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ApicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
