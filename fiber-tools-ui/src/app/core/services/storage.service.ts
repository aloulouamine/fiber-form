import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import uuid from 'uuidv4';
import { Mission, Comment } from '../models/mission';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afStroage: AngularFireStorage) { }

  putCheckpointPicture(file: File, mission: Mission, cpIndex: number, pictureIndex: number) {
    const fileName = `site/${mission.siteId}/mission/${mission.id}/checkpoint/${cpIndex}/picture/${pictureIndex}/${uuid()}.${file.name.split('.').pop()}`;
    return this.afStroage.upload(fileName, file);
  }

  putCommentPicture(mission: Mission, file: File, comment: Comment) {
    const fileName = `site/${mission.siteId}/mission/${mission.id}/comments/${comment.id}/picture/${uuid()}.${file.name.split('.').pop()}`;
    return from(this.afStroage.upload(fileName, file));
  }

  removePicture(url) {
    return this.afStroage.storage.refFromURL(url).delete();
  }


}
