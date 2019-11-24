import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { Comment, Mission, MissionProgressStatus } from '../../../core/models/mission';
import * as fromMissions from '../../../core/reducers';
import { update } from '../../actions/mission-api.actions';
import { addComment, deleteCpPicture, uploadCpPicture } from '../../actions/mission-form.actions';
import { BlockDialogComponent } from '../../components/block-dialog/block-dialog.component';

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
    checkPoints: this.fb.array([]),

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
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {

    this.mission$ = this.route.params.pipe(
      mergeMap(params => this.store.pipe(select(fromMissions.selectMissionById, { missionId: params.id, store: this.store }))));

    this.comments$ = this.mission$.pipe(
      map(mission => mission.comments as Comment[])
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
            const pictureControl = this.fb.control(cp.properties.requiredPhotos[pictureIndex].url, Validators.required);
            pictureControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(file => {
              this._onPictureChange(file, mission, cpIndex, pictureIndex);
            });
            picturesFormGroup.push(pictureControl);
          }
          );
        });


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

  block() {
    this.dialog.open(BlockDialogComponent, {
      width: '90%'
    }).afterClosed().subscribe(comment => {
      this.addComment(comment);
      this.submit(true);
    })
  }

  submit(blocked?: boolean) {
    this.userService
      .getCurrentUserEmail()
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$),
        mergeMap(email => this.mission$.pipe(
          tap(m => {
            const lU = m.workingUsers.reduce((lastUsers, wU) => {
              if (wU !== email) {
                lastUsers.push(wU);
              }
              return lastUsers;
            }, []);
            this.router.navigate(['mission']);
            const progress = blocked ? MissionProgressStatus.BLOCKED : MissionProgressStatus.FINISHED;
            this.store.dispatch(update(
              {
                siteId: m.siteId,
                missionId: m.id,
                changes: {
                  workingUsers: lU,
                  progress
                }
              }
            ));
          }),
        ))
      ).subscribe();
  }

  addComment({ comment, file }) {
    this.mission$.pipe(
      take(1),
      takeUntil(this.unsubscribe$)
    ).subscribe(mission => this.store.dispatch(addComment({ comment, file, mission })));
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

  onTouretChange(changes: Partial<Mission>) {
    this.mission$.pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(
      m => this.store.dispatch(update({ siteId: m.siteId, missionId: m.id, changes }))
    );
  }

}
