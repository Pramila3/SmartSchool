import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAdjustmentComponent } from './manual-adjustment.component';

describe('ManualAdjustmentComponent', () => {
  let component: ManualAdjustmentComponent;
  let fixture: ComponentFixture<ManualAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
