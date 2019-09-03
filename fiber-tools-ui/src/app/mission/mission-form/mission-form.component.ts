import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit {

  form = this.fb.group({
    pictures: this.fb.array([
      [''],
      [{ value: '', disabled: true }],
      ['', Validators.required],
    ]),
    ref: ['123', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  getPicturesControls() {
    const picturesFormArray = this.form.get('pictures') as FormArray;
    return picturesFormArray.controls;

  }

  submit() {
    console.log('done');
  }
}
