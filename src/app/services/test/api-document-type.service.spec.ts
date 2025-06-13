import { TestBed } from '@angular/core/testing';

import { ApiDocumentTypeService } from '../api/api-document-type.service';

describe('ApiDocumentTypeService', () => {
  let service: ApiDocumentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDocumentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
