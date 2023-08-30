import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTimeTableComponent } from './import-time-table.component';

describe('ImportTimeTableComponent', () => {
  let component: ImportTimeTableComponent;
  let fixture: ComponentFixture<ImportTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportTimeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
