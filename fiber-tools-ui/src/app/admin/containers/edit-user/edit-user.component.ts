import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { query, update } from '../../actions/user.actions';
import * as fromAdmin from '../../reducers';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  searchUserFormControl = new FormControl('');
  selectedUser: User;

  private userSource$ = this.store.pipe(select(fromAdmin.userSelectors.selectAll));
  users$: Observable<User[]>;
  form = this.fb.group({
    admin: [],
    supervisor: []
  })
  constructor(
    private store: Store<fromAdmin.State>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.users$ = this.searchUserFormControl.valueChanges.pipe(
      startWith(null),
      mergeMap((query: string | null) => query ? this._filter(query) : this.userSource$)
    );
    this.store.dispatch(query());
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    const user = event && event.option && event.option.value;
    if (user) {
      this.selectedUser = user;
      this.form.get('admin').setValue(user.roles_v2 ? user.roles_v2.admin : false);
      this.form.get('supervisor').setValue(user.roles_v2 ? user.roles_v2.supervisor : false);
    } else {
      this.selectedUser = null;
    }
  }

  private _filter(value: string): Observable<User[]> {
    return this.userSource$.pipe(
      map(users => {
        if (typeof value === 'string') {
          const filterValue = value.toLowerCase();
          return users.filter(u => u.email.includes(filterValue) || u.displayName.includes(filterValue));
        } else {
          return users
        }
      })
    );
  }

  displayFn(user?: User) {
    return user ? `${user.email} (${user.displayName})` : ''
  }

  submit() {
    const changes = {
      roles_v2: this.form.value
    };
    this.store.dispatch(update({ id: this.selectedUser.email, changes }))
  }

}
