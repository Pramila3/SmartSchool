import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllottingStaffComponent } from './allotting-staff.component';

describe('AllottingStaffComponent', () => {
  let component: AllottingStaffComponent;
  let fixture: ComponentFixture<AllottingStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllottingStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllottingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
