import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffSubstitudeComponent } from './add-staff-substitude.component';

describe('AddStaffSubstitudeComponent', () => {
  let component: AddStaffSubstitudeComponent;
  let fixture: ComponentFixture<AddStaffSubstitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffSubstitudeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffSubstitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
