import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { mergeMap, take, filter, tap } from 'rxjs/operators';
import { Mission, MissionProgressStatus } from '../../../core/models/mission';
import { loadMissionApi } from '../../actions/mission-api.actions';
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
    checkPoints: this.fb.array([]),
    ref: ['', Validators.required],
    comment: ['']
  });

  get formCheckPoints(): FormArray {
    return this.form.get('checkPoints') as FormArray;
  }
  get formCheckPointsControls(): FormArray[] {
    return this.formCheckPoints.controls as FormArray[];
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromMissions.AppState>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      mergeMap(params => {
        return this.store.pipe(
          select(fromMissions.selectMissionById, { id: params.id })
        );
      }),
      tap(mission => {
        if (!mission) {
          this.store.dispatch(loadMissionApi())
        }
      }),
      filter(mission => !!mission),
      take(1)
    ).subscribe(
      (mission: Mission) => {
        this.mission = mission;
        mission.checkPoints.map((cp) => {
          const picturesFormGroup = this.fb.array([]);
          this.formCheckPoints.push(picturesFormGroup);
          Array.from({ length: (cp.properties && cp.properties.requiredPhotos) ? cp.properties.requiredPhotos.length : 0 })
            .forEach(() =>
              picturesFormGroup.push(this.fb.control('', Validators.required))
            )
        });
        this.form.get('ref').setValue(mission.number)
        this.form.get('cable').setValue(mission.cable)
        this.form.get('comment').setValue(mission.comments);
      }
    );
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
