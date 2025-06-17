import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSplitConfigurationComponent } from './document-split-configuration.component';

describe('DocumentSplitConfigurationComponent', () => {
  let component: DocumentSplitConfigurationComponent;
  let fixture: ComponentFixture<DocumentSplitConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSplitConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSplitConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
