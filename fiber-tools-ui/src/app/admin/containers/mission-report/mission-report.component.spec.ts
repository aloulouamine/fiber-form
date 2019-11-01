import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionReportComponent } from './mission-report.component';

describe('MissionReportComponent', () => {
  let component: MissionReportComponent;
  let fixture: ComponentFixture<MissionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
