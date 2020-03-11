import { TestBed } from '@angular/core/testing';

import { CompanyHttpService } from './company-http.service';

describe('CompanyHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyHttpService = TestBed.get(CompanyHttpService);
    expect(service).toBeTruthy();
  });
});
