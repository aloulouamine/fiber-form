import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouretInputFormComponent } from './touret-input-form.component';

describe('TouretInputFormComponent', () => {
  let component: TouretInputFormComponent;
  let fixture: ComponentFixture<TouretInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouretInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouretInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
