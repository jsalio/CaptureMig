import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalPropertiesConfigurationComponent } from './external-properties-configuration.component';

describe('ExternalPropertiesConfigurationComponent', () => {
  let component: ExternalPropertiesConfigurationComponent;
  let fixture: ComponentFixture<ExternalPropertiesConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalPropertiesConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalPropertiesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
