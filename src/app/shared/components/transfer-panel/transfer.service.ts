import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { TransferItem } from './transfer-panel.component';

export interface TransferState {
  source: TransferItem[];
  target: TransferItem[];
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private state = new BehaviorSubject<TransferState>({
    source: [],
    target: []
  });

  constructor() {}

  getState(): Observable<TransferState> {
    return this.state.asObservable();
  }

  updateState(newState: TransferState): void {
    this.state.next(newState);
  }

  filterItems(items: TransferItem[], filter: string, displayProperty: string): TransferItem[] {
    if (!filter) return items;
    
    return items.filter(item => {
      const displayValue = item[displayProperty]?.toString().toLowerCase() || '';
      return displayValue.includes(filter.toLowerCase());
    });
  }

  transferItems(
    sourceItems: TransferItem[],
    targetItems: TransferItem[],
    itemsToTransfer: TransferItem[],
    direction: 'source' | 'target'
  ): TransferState {
    if (direction === 'target') {
      return {
        source: sourceItems.filter(item => !itemsToTransfer.includes(item)),
        target: [...targetItems, ...itemsToTransfer]
      };
    } else {
      return {
        source: [...sourceItems, ...itemsToTransfer],
        target: targetItems.filter(item => !itemsToTransfer.includes(item))
      };
    }
  }

  transferAll(
    sourceItems: TransferItem[],
    targetItems: TransferItem[],
    direction: 'source' | 'target'
  ): TransferState {
    if (direction === 'target') {
      return {
        source: [],
        target: [...targetItems, ...sourceItems]
      };
    } else {
      return {
        source: [...sourceItems, ...targetItems],
        target: []
      };
    }
  }
} 