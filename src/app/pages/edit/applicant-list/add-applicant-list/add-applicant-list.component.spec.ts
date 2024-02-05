import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantListComponent } from './add-applicant-list.component';

describe('AddApplicantListComponent', () => {
  let component: AddApplicantListComponent;
  let fixture: ComponentFixture<AddApplicantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApplicantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
