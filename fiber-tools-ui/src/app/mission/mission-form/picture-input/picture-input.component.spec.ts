import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureInputComponent } from './picture-input.component';

describe('PictureInputComponent', () => {
  let component: PictureInputComponent;
  let fixture: ComponentFixture<PictureInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
