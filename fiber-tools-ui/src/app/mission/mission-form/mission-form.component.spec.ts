import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionFormComponent } from './mission-form.component';

describe('MissionFormComponent', () => {
  let component: MissionFormComponent;
  let fixture: ComponentFixture<MissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
