import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonComponent } from './ribbon.component';

describe('RibbonComponent', () => {
  let component: RibbonComponent;
  let fixture: ComponentFixture<RibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
