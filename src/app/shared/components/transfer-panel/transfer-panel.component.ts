import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TransferItem {
  [key: string]: any;
}

@Component({
  selector: 'app-transfer-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss']
})
export class TransferPanelComponent {
  @Input() sourceItems: TransferItem[] = [];
  @Input() targetItems: TransferItem[] = [];
  @Input() displayProperty: string = 'name';
  @Input() sourcePlaceholder: string = 'Search source items...';
  @Input() targetPlaceholder: string = 'Search target items...';

  @Output() itemsChanged = new EventEmitter<{
    source: TransferItem[];
    target: TransferItem[];
  }>();

  sourceFilter = signal<string>('')
  targetFilter: string = '';
  selectedSourceItems: TransferItem[] = [];
  selectedTargetItems: TransferItem[] = [];

  get filteredSourceItems(): TransferItem[] {
    return this.sourceItems.filter(item =>
      this.getItemDisplayValue(item).toLowerCase().includes(this.sourceFilter().toLowerCase())
    );
  }

  get filteredTargetItems(): TransferItem[] {
    return this.targetItems.filter(item =>
      this.getItemDisplayValue(item).toLowerCase().includes(this.targetFilter.toLowerCase())
    );
  }

  getItemDisplayValue(item: TransferItem): string {
    if (this.displayProperty.includes('.')) {
      const properties = this.displayProperty.split('.');
      let value = item;
      for (const prop of properties) {
        value = value?.[prop];
        if (value === undefined || value === null) {
          return '';
        }
      }
      return value.toString();
    }
    return item[this.displayProperty]?.toString() || '';
  }

  toggleSourceSelection(item: TransferItem): void {
    const index = this.selectedSourceItems.indexOf(item);
    if (index === -1) {
      this.selectedSourceItems.push(item);
    } else {
      this.selectedSourceItems.splice(index, 1);
    }
  }

  toggleTargetSelection(item: TransferItem): void {
    const index = this.selectedTargetItems.indexOf(item);
    if (index === -1) {
      this.selectedTargetItems.push(item);
    } else {
      this.selectedTargetItems.splice(index, 1);
    }
  }

  transferToTarget(): void {
    if (this.selectedSourceItems.length === 0) return;

    this.targetItems = [...this.targetItems, ...this.selectedSourceItems];
    this.sourceItems = this.sourceItems.filter(item => !this.selectedSourceItems.includes(item));
    this.selectedSourceItems = [];
    this.emitChanges();
  }

  transferToSource(): void {
    if (this.selectedTargetItems.length === 0) return;

    this.sourceItems = [...this.sourceItems, ...this.selectedTargetItems];
    this.targetItems = this.targetItems.filter(item => !this.selectedTargetItems.includes(item));
    this.selectedTargetItems = [];
    this.emitChanges();
  }

  transferAllToTarget(): void {
    this.targetItems = [...this.targetItems, ...this.sourceItems];
    this.sourceItems = [];
    this.selectedSourceItems = [];
    this.emitChanges();
  }

  transferAllToSource(): void {
    this.sourceItems = [...this.sourceItems, ...this.targetItems];
    this.targetItems = [];
    this.selectedTargetItems = [];
    this.emitChanges();
  }

  private emitChanges(): void {
    this.itemsChanged.emit({
      source: this.sourceItems,
      target: this.targetItems
    });
  }
} 