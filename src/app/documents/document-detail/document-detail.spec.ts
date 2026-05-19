import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DocumentDetail } from './document-detail';

describe('DocumentDetail', () => {
  let component: DocumentDetail;
  let fixture: ComponentFixture<DocumentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
