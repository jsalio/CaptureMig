import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanExceptionComponent } from './scan-exception.component';

describe('ScanExceptionComponent', () => {
  let component: ScanExceptionComponent;
  let fixture: ComponentFixture<ScanExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanExceptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
