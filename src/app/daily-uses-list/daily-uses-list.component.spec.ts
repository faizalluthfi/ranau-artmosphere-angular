import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUsesListComponent } from './daily-uses-list.component';

describe('DailyUsesListComponent', () => {
  let component: DailyUsesListComponent;
  let fixture: ComponentFixture<DailyUsesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyUsesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUsesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
