import { Injectable } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, merge } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Comment, Mission } from 'src/app/core/models/mission';
import { MissionService } from 'src/app/core/services/mission.service';
import { StorageService } from 'src/app/core/services/storage.service';
import * as missionsAdminModuleActions from '../../admin/actions/mission.actions';
import * as missionsModuleActions from '../../mission/actions/mission-api.actions';
import { deletedCpPicture, MissionFormActionTypes, uploadedCpPicture, uploadProgressCpPicture } from '../../mission/actions/mission-form.actions';
import { added, modified, removed } from '../actions/mission.actions';

@Injectable()
export class MissionEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(missionsModuleActions.MissionApiActionTypes.QUERY),
    switchMap((action: any) => this.missionService.getAllMissionsForWorkingUser(action.workingUser)),
    mergeMap(action => action),
    map(action => {
      switch (action.type) {
        case 'added':
          return added({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'modified':
          return modified({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'removed':
          return removed({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
      }
    })));


  uploadPicture$ = createEffect(() => this.actions$.pipe(
    ofType(MissionFormActionTypes.UPLOAD_CP_PICTURE),
    // mergeMap for concurrency.
    mergeMap((action: { file: File, mission: Mission, cpIndex: number, pictureIndex: number }) => {
      const uploadTask = this.storageService.
        putCheckpointPicture(action.file, action.mission, action.cpIndex, action.pictureIndex);
      const uploadFinish$ = from(uploadTask).pipe(
        mergeMap(uploadTaskSnapshot => this.missionService.updatePictureURL(action.mission, uploadTaskSnapshot.ref.fullPath, action.cpIndex, action.pictureIndex)
          .pipe(map(() => uploadedCpPicture())))
      );
      const uploadProgress$ = uploadTask.percentageChanges().pipe(
        map(progress => uploadProgressCpPicture({ progress, key: `${action.mission.id}-${action.cpIndex}-${action.pictureIndex}` }))
      );
      return merge(uploadFinish$, uploadProgress$);
    }),
  ));

  deletePicture$ = createEffect(() => this.actions$.pipe(
    ofType(MissionFormActionTypes.DELETE_CP_PICTURE),
    switchMap((action: { mission: Mission, cpIndex: number, pictureIndex: number }) => {
      return this.missionService.updatePictureURL(action.mission, '', action.cpIndex, action.pictureIndex).pipe(
        map(() => deletedCpPicture())
      );
    })
  ));

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(MissionFormActionTypes.ADD_COMMENT),
    switchMap(({ mission, comment, file }) => {
      if (file) {
        return this.missionService.createNewComment(comment, []).pipe(
          mergeMap((c: Comment) => this.storageService.putCommentPicture(mission, file, c).pipe(
            map((up: UploadTaskSnapshot) => {
              const url = up.ref.fullPath;
              const now = new Date();
              c.photos = [{
                url,
                by: '',
                date: now
              }];
              return c;
            })
          )),
          mergeMap(c => this.missionService.addComment(mission, c))
        );
      }
      return this.missionService.createNewComment(comment, [])
        .pipe(mergeMap(c => this.missionService.addComment(mission, c)));
    }),
    map(() => missionsModuleActions.commentAdded())
  ));


  // admin

  loadAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(missionsAdminModuleActions.MissionActionTypes.QUERY),
    switchMap((action: any) => this.missionService.getSiteMissions(action.siteId)),
    mergeMap(actions => actions),
    map(action => {
      switch (action.type) {
        case 'added':
          return added({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'modified':
          return modified({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
        case 'removed':
          return removed({ payload: { id: action.payload.doc.id, ...action.payload.doc.data() } });
      }
    })
  ));

  updateAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(missionsAdminModuleActions.MissionActionTypes.UPDATE),
    switchMap((action: any) => this.missionService.updateMission(action.siteId, action.missionId, action.changes).pipe(
      map(() => missionsAdminModuleActions.query({ siteId: action.siteId }))
    )),
  ));

  constructor(private actions$: Actions, private missionService: MissionService, private storageService: StorageService) {
  }
}
