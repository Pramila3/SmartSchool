import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixCriteriaComponent } from './fix-criteria.component';

describe('FixCriteriaComponent', () => {
  let component: FixCriteriaComponent;
  let fixture: ComponentFixture<FixCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
