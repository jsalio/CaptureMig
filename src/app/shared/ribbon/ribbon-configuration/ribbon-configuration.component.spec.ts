import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonConfigurationComponent } from './ribbon-configuration.component';

describe('RibbonConfigurationComponent', () => {
  let component: RibbonConfigurationComponent;
  let fixture: ComponentFixture<RibbonConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
