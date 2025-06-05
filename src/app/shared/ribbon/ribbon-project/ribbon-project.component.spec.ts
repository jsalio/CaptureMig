import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonProjectComponent } from './ribbon-project.component';

describe('RibbonProjectComponent', () => {
  let component: RibbonProjectComponent;
  let fixture: ComponentFixture<RibbonProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
