import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByClassComponent } from './by-class.component';

describe('ByClassComponent', () => {
  let component: ByClassComponent;
  let fixture: ComponentFixture<ByClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
