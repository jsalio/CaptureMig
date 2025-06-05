import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonScanExceptionComponent } from './ribbon-scan-exception.component';

describe('RibbonScanExceptionComponent', () => {
  let component: RibbonScanExceptionComponent;
  let fixture: ComponentFixture<RibbonScanExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonScanExceptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonScanExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
