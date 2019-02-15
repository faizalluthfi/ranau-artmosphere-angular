import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUseFormComponent } from './daily-use-form.component';

describe('DailyUseFormComponent', () => {
  let component: DailyUseFormComponent;
  let fixture: ComponentFixture<DailyUseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyUseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
