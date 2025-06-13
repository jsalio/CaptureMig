import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundSplittersConfigurationComponent } from './compound-splitters-configuration.component';

describe('CompoundSplittersConfigurationComponent', () => {
  let component: CompoundSplittersConfigurationComponent;
  let fixture: ComponentFixture<CompoundSplittersConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundSplittersConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundSplittersConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
