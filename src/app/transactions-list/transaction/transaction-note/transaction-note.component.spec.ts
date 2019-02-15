import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionNoteComponent } from './transaction-note.component';

describe('TransactionNoteComponent', () => {
  let component: TransactionNoteComponent;
  let fixture: ComponentFixture<TransactionNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
