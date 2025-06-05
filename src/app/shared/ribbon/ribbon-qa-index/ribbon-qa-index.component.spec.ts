import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonQaIndexComponent } from './ribbon-qa-index.component';

describe('RibbonQaIndexComponent', () => {
  let component: RibbonQaIndexComponent;
  let fixture: ComponentFixture<RibbonQaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonQaIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonQaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
