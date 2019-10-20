import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDisplayComponent } from './comment-display.component';

describe('CommentDisplayComponent', () => {
  let component: CommentDisplayComponent;
  let fixture: ComponentFixture<CommentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
