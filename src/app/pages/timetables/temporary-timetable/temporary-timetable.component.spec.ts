import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryTimetableComponent } from './temporary-timetable.component';

describe('TemporaryTimetableComponent', () => {
  let component: TemporaryTimetableComponent;
  let fixture: ComponentFixture<TemporaryTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryTimetableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporaryTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
