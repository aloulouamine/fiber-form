import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {mergeMap} from 'rxjs/operators';
import {loadMissionApi} from '../../actions/mission-api.actions';
import {Mission, MissionProgressStatus} from '../../../core/models/mission';
import * as fromMissions from '../../reducers/mission.reducer';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit {

  mission: Mission;

  form = this.fb.group({
    cable: [''],
    enrollerNumah: ['', Validators.required],
    pictures: this.fb.array([]),
    ref: ['', Validators.required],
    progress: [''],
    missionProgressStatus: [''],
    comment: ['']
  });

  get formPictures(): FormArray {
    return this.form.get('pictures') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromMissions.AppState>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.store.dispatch(loadMissionApi())
    this.route.params.pipe(
      mergeMap(params => {
        return this.store.pipe(
          select(fromMissions.selectMissionAtIndex, {index: params.id})
        );
      }),
    ).subscribe(
      (mission: Mission) => {
        this.mission = mission;
        mission.boxes.map(() => this.formPictures
          .push(this.fb.control('', Validators.required))
        )
        this.form.get('ref').setValue(mission.site)
        this.form.get('cable').setValue(mission.cable)
        this.form.get('enrollerNumah').setValue(mission.enrollerNumah)
        this.form.get('progress').setValue(mission.progressDistance)
        // this.form.get('progress').setValidators(Validators.max(mission.totalDistance));

        this.form.get('missionProgressStatus').setValue(mission.progressDistance);
        this.form.get('comment').setValue(mission.comments);
      }
    );
  }

  getPicturesControls() {
    return this.formPictures.controls;
  }

  submit() {
    console.log('done');
  }

  saveMissionAsItIs(event: any) {
    console.log('Saved for later');
    this.form.get('missionProgressStatus').setValue(MissionProgressStatus.SUSPENDED);
    // TODO save the thing as it is
    // debug();
    console.log(this.form.getRawValue());
  }
}
