import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIndicatorComponent } from './update-indicator.component';

describe('UpdateIndicatorComponent', () => {
  let component: UpdateIndicatorComponent;
  let fixture: ComponentFixture<UpdateIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
