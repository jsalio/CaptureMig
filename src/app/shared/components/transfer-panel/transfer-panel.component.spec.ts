import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferItem, TransferPanelComponent } from './transfer-panel.component';

import { FormsModule } from '@angular/forms';

describe('TransferPanelComponent', () => {
  let component: TransferPanelComponent;
  let fixture: ComponentFixture<TransferPanelComponent>;

  const mockItems: TransferItem[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TransferPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferPanelComponent);
    component = fixture.componentInstance;
    component.sourceItems = [...mockItems];
    component.targetItems = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter source items', () => {
    component.sourceFilter.set('Item 1');
    expect(component.filteredSourceItems.length).toBe(1);
    expect(component.filteredSourceItems[0]['name']).toBe('Item 1');
  });

  it('should filter target items', () => {
    component.targetItems = [...mockItems];
    component.targetFilter = 'Item 2';
    expect(component.filteredTargetItems.length).toBe(1);
    expect(component.filteredTargetItems[0]['name']).toBe('Item 2');
  });

  it('should transfer selected items to target', () => {
    const item = mockItems[0];
    component.toggleSourceSelection(item);
    component.transferToTarget();
    
    expect(component.sourceItems.length).toBe(2);
    expect(component.targetItems.length).toBe(1);
    expect(component.targetItems[0]).toEqual(item);
  });

  it('should transfer selected items to source', () => {
    component.targetItems = [...mockItems];
    const item = mockItems[0];
    component.toggleTargetSelection(item);
    component.transferToSource();
    
    expect(component.targetItems.length).toBe(2);
    expect(component.sourceItems.length).toBe(4);
    expect(component.sourceItems[3]).toEqual(item);
  });

  it('should transfer all items to target', () => {
    component.transferAllToTarget();
    expect(component.sourceItems.length).toBe(0);
    expect(component.targetItems.length).toBe(3);
  });

  it('should transfer all items to source', () => {
    component.targetItems = [...mockItems];
    component.transferAllToSource();
    expect(component.targetItems.length).toBe(0);
    expect(component.sourceItems.length).toBe(6);
  });

  it('should emit changes when items are transferred', () => {
    spyOn(component.itemsChanged, 'emit');
    const item = mockItems[0];
    component.toggleSourceSelection(item);
    component.transferToTarget();
    
    expect(component.itemsChanged.emit).toHaveBeenCalledWith({
      source: component.sourceItems,
      target: component.targetItems
    });
  });

  it('should handle custom display property', () => {
    component.displayProperty = 'title';
    const item = { id: 1, title: 'Custom Title' };
    expect(component.getItemDisplayValue(item)).toBe('Custom Title');
  });
}); 