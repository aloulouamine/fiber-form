import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import uuid from 'uuidv4';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afStroage: AngularFireStorage) { }

  putPicture(file: File, mission: Mission, cpIndex: number, pictureIndex: number) {
    const fileName = `site/${mission.siteId}/mission/${mission.id}/checkpoint/${cpIndex}/picture/${pictureIndex}/${uuid()}.${file.name.split('.').pop()}`;
    return this.afStroage.upload(fileName, file);
  }

  removePicture(url) {
    return this.afStroage.storage.refFromURL(url).delete()
  }


}
