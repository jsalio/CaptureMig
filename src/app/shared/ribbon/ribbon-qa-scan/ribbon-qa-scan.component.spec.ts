import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonQaScanComponent } from './ribbon-qa-scan.component';

describe('RibbonQaScanComponent', () => {
  let component: RibbonQaScanComponent;
  let fixture: ComponentFixture<RibbonQaScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonQaScanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonQaScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
