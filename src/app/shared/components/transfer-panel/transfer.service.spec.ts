import { TransferService, TransferState } from './transfer.service';

import { TestBed } from '@angular/core/testing';
import { TransferItem } from './transfer-panel.component';

describe('TransferService', () => {
  let service: TransferService;

  const mockItems: TransferItem[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter items correctly', () => {
    const filtered = service.filterItems(mockItems, 'Item 1', 'name');
    expect(filtered.length).toBe(1);
    expect(filtered[0]['name']).toBe('Item 1');
  });

  it('should handle empty filter', () => {
    const filtered = service.filterItems(mockItems, '', 'name');
    expect(filtered).toEqual(mockItems);
  });

  it('should transfer items to target', () => {
    const itemsToTransfer = [mockItems[0]];
    const result = service.transferItems(
      mockItems,
      [],
      itemsToTransfer,
      'target'
    );

    expect(result.source.length).toBe(2);
    expect(result.target.length).toBe(1);
    expect(result.target[0]).toEqual(mockItems[0]);
  });

  it('should transfer items to source', () => {
    const itemsToTransfer = [mockItems[0]];
    const result = service.transferItems(
      [],
      mockItems,
      itemsToTransfer,
      'source'
    );

    expect(result.target.length).toBe(2);
    expect(result.source.length).toBe(1);
    expect(result.source[0]).toEqual(mockItems[0]);
  });

  it('should transfer all items to target', () => {
    const result = service.transferAll(mockItems, [], 'target');
    expect(result.source.length).toBe(0);
    expect(result.target.length).toBe(3);
  });

  it('should transfer all items to source', () => {
    const result = service.transferAll([], mockItems, 'source');
    expect(result.target.length).toBe(0);
    expect(result.source.length).toBe(3);
  });

  it('should update and emit state', (done) => {
    const newState: TransferState = {
      source: mockItems,
      target: []
    };

    service.getState().subscribe(state => {
      expect(state).toEqual(newState);
      done();
    });

    service.updateState(newState);
  });
}); 