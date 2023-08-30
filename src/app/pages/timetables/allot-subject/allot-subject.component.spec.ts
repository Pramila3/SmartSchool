import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotSubjectComponent } from './allot-subject.component';

describe('AllotSubjectComponent', () => {
  let component: AllotSubjectComponent;
  let fixture: ComponentFixture<AllotSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllotSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllotSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
