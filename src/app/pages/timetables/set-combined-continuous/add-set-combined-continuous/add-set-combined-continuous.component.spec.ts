import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetCombinedContinuousComponent } from './add-set-combined-continuous.component';

describe('AddSetCombinedContinuousComponent', () => {
  let component: AddSetCombinedContinuousComponent;
  let fixture: ComponentFixture<AddSetCombinedContinuousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSetCombinedContinuousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSetCombinedContinuousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
