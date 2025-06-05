import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleseaComponent } from './relesea.component';

describe('ReleseaComponent', () => {
  let component: ReleseaComponent;
  let fixture: ComponentFixture<ReleseaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleseaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleseaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
