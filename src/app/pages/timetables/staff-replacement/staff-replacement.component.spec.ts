import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffReplacementComponent } from './staff-replacement.component';

describe('StaffReplacementComponent', () => {
  let component: StaffReplacementComponent;
  let fixture: ComponentFixture<StaffReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffReplacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
