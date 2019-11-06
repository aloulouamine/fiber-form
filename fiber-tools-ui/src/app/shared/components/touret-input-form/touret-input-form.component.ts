import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Mission } from 'src/app/core/models/mission';

@Component({
  selector: 'app-touret-input-form',
  templateUrl: './touret-input-form.component.html',
  styleUrls: ['./touret-input-form.component.css']
})
export class TouretInputFormComponent implements OnInit, OnChanges, OnDestroy {


  @Input() mission: Mission;
  @Output() touretChange = new EventEmitter<Partial<Mission>>();

  unsubscribe$ = new Subject<void>();


  form = this.fb.group({
    t1: [''],
    mStart1: [{ value: '', disabled: true }],
    mEnd1: [{ value: '', disabled: true }],
    t2: [{ value: '', disabled: true }],
    mStart2: [{ value: '', disabled: true }],
    mEnd2: [{ value: '', disabled: true }]
  })

  constructor(private fb: FormBuilder) {
    this.form.get('t1').valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(this.setT1Ciblings.bind(this));

    this.form.get('t2').valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(this.setT2Ciblings.bind(this));
  }

  private setT1Ciblings(t1Value?) {
    const ciblingsControls = [
      this.form.get('mStart1'),
      this.form.get('mEnd1'),
      this.form.get('t2')
    ];
    if (t1Value) {
      ciblingsControls.forEach(c => c.enable());
    } else {
      ciblingsControls.forEach(c => {
        c.disable();
        c.reset();
      });
    }
  }

  private setT2Ciblings(t2Value?) {
    const ciblingsControls = [
      this.form.get('mStart2'),
      this.form.get('mEnd2'),
    ];
    if (t2Value) {
      ciblingsControls.forEach(c => c.enable())
    } else {
      ciblingsControls.forEach(c => {
        c.disable();
        c.reset();
      })
    }
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      map(v => (<Partial<Mission>>{
        firstTouretId: v.t1 ? v.t1 : '',
        secondTouretId: v.t2 ? v.t2 : '',
        firstTouretMeteringStart: v.mStart1 ? v.mStart1 : '',
        secondTouretMeteringStart: v.mStart2 ? v.mStart2 : '',
        firstTouretMeteringEnd: v.mEnd1 ? v.mEnd1 : '',
        secondTouretMeteringEnd: v.mEnd2 ? v.mEnd2 : ''
      })),
      debounceTime(500)
    ).subscribe(v => {
      this.touretChange.next(v);
    });
  }

  ngOnChanges() {
    if (this.mission) {
      this.form.get('t1').setValue(this.mission.firstTouretId);
      this.setT1Ciblings(this.mission.firstTouretId);
      this.form.get('mStart1').setValue(this.mission.firstTouretMeteringStart);
      this.form.get('mEnd1').setValue(this.mission.firstTouretMeteringEnd);
      this.form.get('t2').setValue(this.mission.secondTouretId);
      this.setT2Ciblings(this.mission.secondTouretId);
      this.form.get('mStart2').setValue(this.mission.secondTouretMeteringStart);
      this.form.get('mEnd2').setValue(this.mission.secondTouretMeteringEnd);
    } else {
      this.setT1Ciblings()
      this.setT2Ciblings()
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
