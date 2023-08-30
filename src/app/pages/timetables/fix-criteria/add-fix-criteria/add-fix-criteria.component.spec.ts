import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixCriteriaComponent } from './add-fix-criteria.component';

describe('AddFixCriteriaComponent', () => {
  let component: AddFixCriteriaComponent;
  let fixture: ComponentFixture<AddFixCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFixCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFixCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
