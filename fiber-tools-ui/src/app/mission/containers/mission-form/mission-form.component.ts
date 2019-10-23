import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, mergeMap, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { Mission } from '../../../core/models/mission';
import { query } from '../../actions/mission-api.actions';
import { addComment, updateCpPicture } from '../../actions/mission-form.actions';
import * as fromTechMissions from '../../reducers';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  mission$: Observable<Mission>;

  writingComment$: Observable<boolean> = this.store.pipe(
    select(fromTechMissions.isWritingComment)
  );

  form = this.fb.group({
    cable: [''],
    checkPoints: this.fb.array([]),
    ref: ['', Validators.required]
  });

  get formCheckPoints(): FormArray {
    return this.form.get('checkPoints') as FormArray;
  }

  get formCheckPointsControls(): FormArray[] {
    return this.formCheckPoints.controls as FormArray[];
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromTechMissions.State>,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {

    this.mission$ = this.route.params.pipe(
      mergeMap(params => this.store.pipe(
        select(fromTechMissions.selectMissionById, { missionId: params.id })
      )),
      tap(mission => {
        if (!mission) {
          this.userService
            .getCurrentUserEmail()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(workingUser => this.store.dispatch(query({ workingUser })));
        }
      }),
      filter(mission => !!mission)
    );

    this.mission$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (mission: Mission) => {
        this.formCheckPoints.clear();
        mission.checkPoints.map((cp, cpIndex) => {
          const picturesFormGroup = this.fb.array([]);
          this.formCheckPoints.push(picturesFormGroup);
          // TODO check not requiring photos
          if (!cp.nbPhotosToTakeWithinCheckPoint) { return; }
          Array.from({
            length: (cp.properties && cp.properties.requiredPhotos) ? cp.properties.requiredPhotos.length : 0
          }).forEach((_, pictureIndex) => {
            const pictureControl = this.fb.control('', Validators.required);
            pictureControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(file => {
              this._onPictureChange(file, mission, cpIndex, pictureIndex);
            });
            picturesFormGroup.push(pictureControl);
          }
          );
        });
        this.form.get('ref').setValue(mission.number);
        this.form.get('cable').setValue(mission.cable);
      }
    );
  }

  private _onPictureChange(file: File, mission: Mission, cpIndex: number, pictureIndex: number) {
    this.store.dispatch(updateCpPicture({ file, mission, cpIndex, pictureIndex }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit() {
    console.log('done');
  }

  addComment({ comment, file }) {
    this.mission$.pipe(take(1)).subscribe(mission => this.store.dispatch(addComment({ comment, file, mission })));
  }

  getCheckpointProgress(missionId, cpIndex) {
    return this.store.pipe(
      select(fromTechMissions.checkpointProgress, { missionId, cpIndex })
    )
  }

}
