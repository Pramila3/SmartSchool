import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByStaffComponent } from './by-staff.component';

describe('ByStaffComponent', () => {
  let component: ByStaffComponent;
  let fixture: ComponentFixture<ByStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
