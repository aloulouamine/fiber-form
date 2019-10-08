import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMissionsComponent } from './site-missions.component';

describe('SiteMissionsComponent', () => {
  let component: SiteMissionsComponent;
  let fixture: ComponentFixture<SiteMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
