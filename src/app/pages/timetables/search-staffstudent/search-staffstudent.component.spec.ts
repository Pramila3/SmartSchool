import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStaffstudentComponent } from './search-staffstudent.component';

describe('SearchStaffstudentComponent', () => {
  let component: SearchStaffstudentComponent;
  let fixture: ComponentFixture<SearchStaffstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStaffstudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStaffstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
