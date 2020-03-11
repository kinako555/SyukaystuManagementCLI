import { TestBed } from '@angular/core/testing';

import { SelectionHttpService } from './selection-http.service';

describe('SelectionHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectionHttpService = TestBed.get(SelectionHttpService);
    expect(service).toBeTruthy();
  });
});
