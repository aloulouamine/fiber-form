import { Component, HostBinding, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-picture-input',
  templateUrl: './picture-input.component.html',
  styleUrls: ['./picture-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PictureInputComponent),
      multi: true
    }
  ]
})
export class PictureInputComponent implements OnInit, ControlValueAccessor {

  displayData;
  @Input() label;
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  onChange = (data) => { };
  onTouched = noop;

  private reader = new FileReader();
  constructor() {

  }

  writeValue(data: string) {
    this.displayData = data;
    this.onChange(this.displayData);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  ngOnInit() {
    if (!this.disabled) {
      this.reader.onload = () => {
        this.displayData = this.reader.result;
        this.writeValue(this.displayData);
      }
    }
  }

  onFileChange(fileInput: HTMLInputElement) {
    this.reader.readAsDataURL(fileInput.files[0]);
  }

  clearPicture() {
    delete this.displayData;
    this.writeValue(undefined);
  }

}
