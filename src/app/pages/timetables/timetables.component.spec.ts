import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablesComponent } from './timetables.component';

describe('TimetablesComponent', () => {
  let component: TimetablesComponent;
  let fixture: ComponentFixture<TimetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
