import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedStaffSubstituteComponent } from './selected-staff-substitute.component';

describe('SelectedStaffSubstituteComponent', () => {
  let component: SelectedStaffSubstituteComponent;
  let fixture: ComponentFixture<SelectedStaffSubstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedStaffSubstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedStaffSubstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
