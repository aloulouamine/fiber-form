import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SiteEffects } from './site.effects';

describe('SiteEffects', () => {
  let actions$: Observable<any>;
  let effects: SiteEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<SiteEffects>(SiteEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
