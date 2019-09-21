import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SiteService } from 'src/app/core/services/site.service';
import { loadSitesApiError, loadSitesApiSuccess, SiteActionTypes } from '../actions/site.actions';
import { of } from 'rxjs';



@Injectable()
export class SiteEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(SiteActionTypes.LoadSitesApi),
    switchMap(() => this.sitesService.getSites()
      .pipe(
        map(values => loadSitesApiSuccess({ values })),
        catchError(errorMessage => of(loadSitesApiError({ errorMessage })))
      ))
  ));

  constructor(private actions$: Actions, private sitesService: SiteService) { }

}
