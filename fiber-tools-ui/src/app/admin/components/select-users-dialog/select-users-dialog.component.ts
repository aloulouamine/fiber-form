import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map, mergeMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '../../reducers';
import { query } from '../../actions/user.actions';

@Component({
  selector: 'app-select-users-dialog',
  templateUrl: './select-users-dialog.component.html',
  styleUrls: ['./select-users-dialog.component.css']
})
export class SelectUsersDialogComponent implements OnInit {

  @ViewChild('emailInput', { static: false }) emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  emailCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allEmails$: Observable<string[]>;
  filteredEmails$: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public emails: string[], private stroe: Store<fromAdmin.State>) { }

  ngOnInit() {
    this.allEmails$ = this.stroe.pipe(
      select(fromAdmin.userSelectors.selectAll),
      map(users => users.map(user => user.email))
    );

    this.stroe.dispatch(query());

    this.filteredEmails$ = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      mergeMap((email: string | null) => email ? this._filter(email) : this.allEmails$));
  }

  add(event: MatChipInputEvent): void {
    // Add email only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our email
      if ((value || '').trim()) {
        this.emails.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.emailCtrl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.emails.indexOf(event.option.viewValue) < 0) {
      this.emails.push(event.option.viewValue);
    }
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.allEmails$.pipe(map(emails => emails.filter(email => email.toLowerCase().indexOf(filterValue) === 0)));
  }


}
