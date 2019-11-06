import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMissionDialogComponent } from './edit-mission-dialog.component';

describe('SelectUsersDialogComponent', () => {
  let component: EditMissionDialogComponent;
  let fixture: ComponentFixture<EditMissionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMissionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
