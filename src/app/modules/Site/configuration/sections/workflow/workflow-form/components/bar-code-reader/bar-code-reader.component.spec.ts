import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCodeReaderComponent } from './bar-code-reader.component';

describe('BarCodeReaderComponent', () => {
  let component: BarCodeReaderComponent;
  let fixture: ComponentFixture<BarCodeReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarCodeReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarCodeReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
