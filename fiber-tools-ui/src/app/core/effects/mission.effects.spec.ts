import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MissionEffects } from './mission.effects';

describe('MissionEffects', () => {
  let actions$: Observable<any>;
  let effects: MissionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MissionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<MissionEffects>(MissionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
