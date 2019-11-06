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
import { Mission } from 'src/app/core/models/mission';

@Component({
  selector: 'app-edit-mission-dialog',
  templateUrl: './edit-mission-dialog.component.html',
  styleUrls: ['./edit-mission-dialog.component.css']
})
export class EditMissionDialogComponent implements OnInit {

  @ViewChild('emailInput', { static: false }) emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  emailCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allEmails$: Observable<string[]>;
  filteredEmails$: Observable<string[]>;

  touretInfo: Partial<Mission>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      mission: Mission,
      emails: string[]
    },
    private stroe: Store<fromAdmin.State>
  ) { }

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
        this.data.emails.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.emailCtrl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.data.emails.indexOf(event.option.viewValue) < 0) {
      this.data.emails.push(event.option.viewValue);
    }
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.data.emails.indexOf(email);
    if (index >= 0) {
      this.data.emails.splice(index, 1);
    }
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.allEmails$.pipe(map(emails => emails.filter(email => email.toLowerCase().indexOf(filterValue) === 0)));
  }

  onTouretChange(changes: Partial<Mission>) {
    this.touretInfo = changes;
  }
}
