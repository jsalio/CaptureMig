import { TestBed } from '@angular/core/testing';

import { ApiComposeBarcodeConfigurationService } from '../api/api-compose-barcode-configuration.service';

describe('ApiComposeBarcodeConfigurationService', () => {
  let service: ApiComposeBarcodeConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiComposeBarcodeConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
