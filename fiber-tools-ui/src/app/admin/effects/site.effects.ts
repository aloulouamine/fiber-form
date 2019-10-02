import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, map, tap } from 'rxjs/operators';
import { SiteService } from 'src/app/core/services/site.service';
import { SiteActionTypes, added, modified, removed, query } from '../actions/site.actions';




@Injectable()
export class SiteEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.QUERY),
    switchMap(() => this.sitesService.getSites()),
    mergeMap(actions => actions),
    // TODO handle errors
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

  add$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.ADD),
    mergeMap((action: any) => this.sitesService.addSite(action.payload)),
    map(() => query())
  ))

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.REMOVE),
    mergeMap((action: any) => this.sitesService.removeSite(action.payload)),
    map(() => query())
  ));

  constructor(private actions$: Actions, private sitesService: SiteService) { }

}
