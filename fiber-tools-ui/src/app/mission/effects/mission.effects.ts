import { Injectable } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Mission } from 'src/app/core/models/mission';
import { MissionService } from 'src/app/core/services/mission.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { added, MissionApiActionTypes, modified, removed, commentAdded } from '../actions/mission-api.actions';
import { MissionFormActionTypes } from '../actions/mission-form.actions';


@Injectable()
export class MissionEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(MissionApiActionTypes.QUERY),
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


  update$ = createEffect(() => this.actions$.pipe(
    ofType(MissionFormActionTypes.UPDATE_CP_PICTURE),
    switchMap((action: { file: File, mission: Mission, cpIndex: number, pictureIndex: number }) => {
      if (action.file) {
        return this.storageService.putPicture(action.file, action.mission, action.cpIndex, action.pictureIndex)
          .then((up: UploadTaskSnapshot) => {
            return up.ref.getDownloadURL().then(url => {
              const mission = {
                ...action.mission,
                checkPoints: [...(action.cpIndex != 0 ? action.mission.checkPoints.slice(0, action.cpIndex) : []), {
                  ...action.mission.checkPoints[action.cpIndex],
                  properties: {
                    ...action.mission.checkPoints[action.cpIndex].properties,
                    requiredPhotos: [
                      ...(action.pictureIndex != 0 ? action.mission.checkPoints[action.cpIndex].properties.requiredPhotos.slice(0, action.pictureIndex) : []),
                      {
                        ...action.mission.checkPoints[action.cpIndex].properties.requiredPhotos[action.pictureIndex],
                        url: url
                      },
                      ...(action.pictureIndex != action.mission.checkPoints[action.cpIndex].properties.requiredPhotos.length ? action.mission.checkPoints[action.cpIndex].properties.requiredPhotos.slice(action.pictureIndex + 1) : []),
                    ]
                  }
                }, ...(action.cpIndex != action.mission.checkPoints.length ? action.mission.checkPoints.slice(action.cpIndex + 1) : [])]
              };
              return this.missionService.updateMission(mission.siteId, mission.id, mission).pipe(map(() => mission));
            })
          });
      } else {
        const mission = {
          ...action.mission,
          checkPoints: [...(action.cpIndex != 0 ? action.mission.checkPoints.slice(0, action.cpIndex) : []), {
            ...action.mission.checkPoints[action.cpIndex],
            properties: {
              ...action.mission.checkPoints[action.cpIndex].properties,
              requiredPhotos: [
                ...(action.pictureIndex != 0 ? action.mission.checkPoints[action.cpIndex].properties.requiredPhotos.slice(0, action.pictureIndex) : []),
                {
                  ...action.mission.checkPoints[action.cpIndex].properties.requiredPhotos[action.pictureIndex],
                  url: ''
                },
                ...(action.pictureIndex != action.mission.checkPoints[action.cpIndex].properties.requiredPhotos.length ? action.mission.checkPoints[action.cpIndex].properties.requiredPhotos.slice(action.pictureIndex + 1) : []),
              ]
            }
          }, ...(action.cpIndex != action.mission.checkPoints.length ? action.mission.checkPoints.slice(action.cpIndex + 1) : [])]
        };
        return of(this.missionService.updateMission(mission.siteId, mission.id, mission).pipe(
          map(() => mission),
          // TODO keep picture history
          tap(() => this.storageService.removePicture(action.mission.checkPoints[action.cpIndex].properties.requiredPhotos[action.pictureIndex].url).then())
        ));
      }
    }),
    mergeMap(mission => mission),
    map((mission: Mission) => modified({ payload: mission }))
  ));


  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(MissionFormActionTypes.ADD_COMMENT),
    switchMap(({ mission, comment }) => {
      return this.missionService.addComment(mission, comment);
    }),
    map(() => commentAdded())
  ))

  constructor(private actions$: Actions, private missionService: MissionService, private storageService: StorageService) {
  }
}
