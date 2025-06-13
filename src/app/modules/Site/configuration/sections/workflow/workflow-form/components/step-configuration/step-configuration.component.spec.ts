import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepConfigurationComponent } from './step-configuration.component';

describe('StepConfigurationComponent', () => {
  let component: StepConfigurationComponent;
  let fixture: ComponentFixture<StepConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
