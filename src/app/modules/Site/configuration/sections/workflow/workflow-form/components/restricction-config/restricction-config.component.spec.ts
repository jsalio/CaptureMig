import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestricctionConfigComponent } from './restricction-config.component';

describe('RestricctionConfigComponent', () => {
  let component: RestricctionConfigComponent;
  let fixture: ComponentFixture<RestricctionConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestricctionConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestricctionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
