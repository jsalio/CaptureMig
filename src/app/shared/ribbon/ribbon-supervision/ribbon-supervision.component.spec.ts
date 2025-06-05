import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonSupervisionComponent } from './ribbon-supervision.component';

describe('RibbonSupervisionComponent', () => {
  let component: RibbonSupervisionComponent;
  let fixture: ComponentFixture<RibbonSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonSupervisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
