import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FormulaireService } from './formulaire.service';

describe('FormulaireService', () => {
  let service: FormulaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
    ],});
    service = TestBed.inject(FormulaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
