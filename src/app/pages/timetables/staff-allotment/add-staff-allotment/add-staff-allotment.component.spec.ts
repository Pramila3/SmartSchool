import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffAllotmentComponent } from './add-staff-allotment.component';

describe('AddStaffAllotmentComponent', () => {
  let component: AddStaffAllotmentComponent;
  let fixture: ComponentFixture<AddStaffAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffAllotmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
