import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionStatusComponent } from './mission-status.component';

describe('MissionStatusComponent', () => {
  let component: MissionStatusComponent;
  let fixture: ComponentFixture<MissionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
