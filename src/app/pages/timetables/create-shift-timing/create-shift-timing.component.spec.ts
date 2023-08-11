import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShiftTimingComponent } from './create-shift-timing.component';

describe('CreateShiftTimingComponent', () => {
  let component: CreateShiftTimingComponent;
  let fixture: ComponentFixture<CreateShiftTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShiftTimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShiftTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
