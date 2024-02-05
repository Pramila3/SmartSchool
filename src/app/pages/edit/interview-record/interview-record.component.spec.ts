import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewRecordComponent } from './interview-record.component';

describe('InterviewRecordComponent', () => {
  let component: InterviewRecordComponent;
  let fixture: ComponentFixture<InterviewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
