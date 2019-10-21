import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { added, modified, removed, UserActionTypes } from '../actions/user.actions';



@Injectable()
export class UserEffects {

  $query = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.QUERY),
    switchMap(() => this.userService.getUsers()),
    mergeMap(action => action),
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



  constructor(private actions$: Actions, private userService: UserService) { }

}
