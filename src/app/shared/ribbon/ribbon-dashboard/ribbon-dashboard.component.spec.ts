import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonDashboardComponent } from './ribbon-dashboard.component';

describe('RibbonDashboardComponent', () => {
  let component: RibbonDashboardComponent;
  let fixture: ComponentFixture<RibbonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
