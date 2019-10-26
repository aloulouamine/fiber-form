import { Component, forwardRef, HostBinding, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, noop } from 'rxjs';

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
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  constructor() { }

  loading$ = new BehaviorSubject<boolean>(false);
  displayData;
  @Input() label;
  @Input() disabled = false;
  @Input() url: string;

  @Input() uploadProgress: number;

  @Output() selectFile = new EventEmitter<File>();
  onTouched = noop;

  private reader = new FileReader();

  onChange = (data) => { };

  writeValue(data: File) {
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
        this.loading$.next(false);
      };
    }
  }

  onFileChange(fileInput: HTMLInputElement) {
    this.loading$.next(true);
    this.reader.readAsDataURL(fileInput.files[0]);
    this.writeValue(fileInput.files[0]);
    this.selectFile.next(fileInput.files[0]);
  }

  clearPicture() {
    delete this.displayData;
    this.writeValue(null);
    this.selectFile.next();
  }

  removePicture() {
    this.url='';
    this.writeValue(null);
  }

}
