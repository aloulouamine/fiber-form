import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPointIconComponent } from './check-point-icon.component';

describe('CheckPointIconComponent', () => {
  let component: CheckPointIconComponent;
  let fixture: ComponentFixture<CheckPointIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPointIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPointIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
