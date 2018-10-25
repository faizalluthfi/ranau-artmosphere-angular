import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCategoryFormComponent } from './report-category-form.component';

describe('ReportCategoryFormComponent', () => {
  let component: ReportCategoryFormComponent;
  let fixture: ComponentFixture<ReportCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
