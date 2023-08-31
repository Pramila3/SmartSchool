import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTimetableComponent } from './process-timetable.component';

describe('ProcessTimetableComponent', () => {
  let component: ProcessTimetableComponent;
  let fixture: ComponentFixture<ProcessTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTimetableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
