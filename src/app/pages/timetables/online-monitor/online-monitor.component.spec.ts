import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineMonitorComponent } from './online-monitor.component';

describe('OnlineMonitorComponent', () => {
  let component: OnlineMonitorComponent;
  let fixture: ComponentFixture<OnlineMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
