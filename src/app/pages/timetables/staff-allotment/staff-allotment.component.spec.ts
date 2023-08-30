import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAllotmentComponent } from './staff-allotment.component';

describe('StaffAllotmentComponent', () => {
  let component: StaffAllotmentComponent;
  let fixture: ComponentFixture<StaffAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAllotmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
