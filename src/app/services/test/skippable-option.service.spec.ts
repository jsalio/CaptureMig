import { TestBed } from '@angular/core/testing';

import { SkippableOptionService } from './skippable-option.service';

describe('SkippableOptionService', () => {
  let service: SkippableOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkippableOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
