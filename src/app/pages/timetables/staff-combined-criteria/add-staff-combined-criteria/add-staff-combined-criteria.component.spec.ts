import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffCombinedCriteriaComponent } from './add-staff-combined-criteria.component';

describe('AddStaffCombinedCriteriaComponent', () => {
  let component: AddStaffCombinedCriteriaComponent;
  let fixture: ComponentFixture<AddStaffCombinedCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffCombinedCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffCombinedCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
