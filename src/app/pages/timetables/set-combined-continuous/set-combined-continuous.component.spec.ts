import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCombinedContinuousComponent } from './set-combined-continuous.component';

describe('SetCombinedContinuousComponent', () => {
  let component: SetCombinedContinuousComponent;
  let fixture: ComponentFixture<SetCombinedContinuousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetCombinedContinuousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetCombinedContinuousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
