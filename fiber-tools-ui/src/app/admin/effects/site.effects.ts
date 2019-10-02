import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { SiteService } from 'src/app/core/services/site.service';
import { SiteActionTypes, added, modified, removed } from '../actions/site.actions';



@Injectable()
export class SiteEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.QUERY),
    switchMap((actions) => {
      console.log(actions);
      return this.sitesService.getSites()
    }),
    mergeMap(actions => actions),
    map(action => {
      switch (action.type) {
        case 'added':
          return added({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'modified':
          return modified({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'removed':
          return removed({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
      }
    })

  ));

  constructor(private actions$: Actions, private sitesService: SiteService) { }

}
