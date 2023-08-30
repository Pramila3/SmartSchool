import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSubstitudeComponent } from './staff-substitude.component';

describe('StaffSubstitudeComponent', () => {
  let component: StaffSubstitudeComponent;
  let fixture: ComponentFixture<StaffSubstitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSubstitudeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffSubstitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
