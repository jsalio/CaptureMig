import { TestBed } from '@angular/core/testing';

import { ApiVolumeService } from '../api/api-volume.service';

describe('ApiVolumeService', () => {
  let service: ApiVolumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVolumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
