import { TestBed } from '@angular/core/testing';

import { ApiWorkflowService } from './api-workflow.service';

describe('ApiWorkflowService', () => {
  let service: ApiWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
