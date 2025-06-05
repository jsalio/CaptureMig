import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonReleaseComponent } from './ribbon-release.component';

describe('RibbonReleaseComponent', () => {
  let component: RibbonReleaseComponent;
  let fixture: ComponentFixture<RibbonReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonReleaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
