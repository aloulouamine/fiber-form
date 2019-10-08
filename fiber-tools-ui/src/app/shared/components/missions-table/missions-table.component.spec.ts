import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsTableComponent } from './missions-table.component';

describe('MissionsTableComponent', () => {
  let component: MissionsTableComponent;
  let fixture: ComponentFixture<MissionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
