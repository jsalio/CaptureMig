import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonScanComponent } from './ribbon-scan.component';

describe('RibbonScanComponent', () => {
  let component: RibbonScanComponent;
  let fixture: ComponentFixture<RibbonScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonScanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
