import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCombinedCriteriaComponent } from './staff-combined-criteria.component';

describe('StaffCombinedCriteriaComponent', () => {
  let component: StaffCombinedCriteriaComponent;
  let fixture: ComponentFixture<StaffCombinedCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffCombinedCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCombinedCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
