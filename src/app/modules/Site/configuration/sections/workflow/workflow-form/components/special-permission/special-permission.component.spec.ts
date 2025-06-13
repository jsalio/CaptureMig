import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPermissionComponent } from './special-permission.component';

describe('SpecialPermissionComponent', () => {
  let component: SpecialPermissionComponent;
  let fixture: ComponentFixture<SpecialPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
