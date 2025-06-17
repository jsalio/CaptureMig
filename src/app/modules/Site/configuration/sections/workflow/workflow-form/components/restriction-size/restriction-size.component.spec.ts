import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionSizeComponent } from './restriction-size.component';

describe('RestrictionSizeComponent', () => {
  let component: RestrictionSizeComponent;
  let fixture: ComponentFixture<RestrictionSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictionSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestrictionSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
