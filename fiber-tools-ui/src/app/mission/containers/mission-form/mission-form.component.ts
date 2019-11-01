import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, mergeMap } from 'rxjs/operators';
import { Mission, Comment } from '../../../core/models/mission';
import { addComment, deleteCpPicture, uploadCpPicture } from '../../actions/mission-form.actions';
import * as fromMissions from '../../../core/reducers';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  mission$: Observable<Mission>;

  comments$: Observable<Comment[]>;

  writingComment$: Observable<boolean> = this.store.pipe(
    select(fromMissions.isWritingComment)
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
    private store: Store<fromMissions.State>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.mission$ = this.route.params.pipe(
      mergeMap(params => this.store.pipe(select(fromMissions.selectMissionById, { missionId: params.id }))));

    this.comments$ = this.mission$.pipe(
      map(mission => mission.comments)
    );

    this.mission$.pipe(takeUntil(this.unsubscribe$), take(1)).subscribe(
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
    if (file) {
      this.store.dispatch(uploadCpPicture({ file, mission, cpIndex, pictureIndex }));
    } else {
      this.store.dispatch(deleteCpPicture({ mission, cpIndex, pictureIndex }));
    }
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
      select(fromMissions.checkpointShootingProgress, { missionId, cpIndex })
    );
  }

  getUploadProgress(missionId, cpIndex, pictureIndex) {
    return this.store.pipe(
      select(fromMissions.cpUploadProgress, { missionId, cpIndex, pictureIndex })
    );
  }

}
