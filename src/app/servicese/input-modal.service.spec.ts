import { TestBed } from '@angular/core/testing';

import { InputModalService } from './input-modal.service';

describe('InputModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputModalService = TestBed.get(InputModalService);
    expect(service).toBeTruthy();
  });
});
