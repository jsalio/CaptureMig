import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaScanComponent } from './qa-scan.component';

describe('QaScanComponent', () => {
  let component: QaScanComponent;
  let fixture: ComponentFixture<QaScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaScanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
