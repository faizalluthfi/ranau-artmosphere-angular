import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesInputsComponent } from './services-inputs.component';

describe('ServicesInputsComponent', () => {
  let component: ServicesInputsComponent;
  let fixture: ComponentFixture<ServicesInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
