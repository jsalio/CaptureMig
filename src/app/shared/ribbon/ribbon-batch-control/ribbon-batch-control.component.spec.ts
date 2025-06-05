import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonBatchControlComponent } from './ribbon-batch-control.component';

describe('RibbonBatchControlComponent', () => {
  let component: RibbonBatchControlComponent;
  let fixture: ComponentFixture<RibbonBatchControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonBatchControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonBatchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
