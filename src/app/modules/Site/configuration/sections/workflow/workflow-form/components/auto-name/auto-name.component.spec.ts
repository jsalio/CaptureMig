import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoNameComponent } from './auto-name.component';

describe('AutoNameComponent', () => {
  let component: AutoNameComponent;
  let fixture: ComponentFixture<AutoNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
