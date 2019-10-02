import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteConfirmDeleteComponent } from './site-confirm-delete.component';

describe('SiteConfirmDeleteComponent', () => {
  let component: SiteConfirmDeleteComponent;
  let fixture: ComponentFixture<SiteConfirmDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteConfirmDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
