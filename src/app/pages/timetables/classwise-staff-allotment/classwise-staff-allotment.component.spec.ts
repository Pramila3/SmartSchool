import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasswiseStaffAllotmentComponent } from './classwise-staff-allotment.component';

describe('ClasswiseStaffAllotmentComponent', () => {
  let component: ClasswiseStaffAllotmentComponent;
  let fixture: ComponentFixture<ClasswiseStaffAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasswiseStaffAllotmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasswiseStaffAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
