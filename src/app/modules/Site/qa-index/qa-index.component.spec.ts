import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaIndexComponent } from './qa-index.component';

describe('QaIndexComponent', () => {
  let component: QaIndexComponent;
  let fixture: ComponentFixture<QaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QaIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
