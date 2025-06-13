import { TestBed } from '@angular/core/testing';

import { ApiExternalPropertiesService } from '../api/api-external-properties.service';

describe('ApiExternalPropertiesService', () => {
  let service: ApiExternalPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExternalPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
