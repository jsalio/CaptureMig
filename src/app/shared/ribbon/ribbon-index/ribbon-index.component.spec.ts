import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonIndexComponent } from './ribbon-index.component';

describe('RibbonIndexComponent', () => {
  let component: RibbonIndexComponent;
  let fixture: ComponentFixture<RibbonIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
