import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import uuid from 'uuidv4';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afStroage: AngularFireStorage) { }

  putPicture(file: File) {
    return this.afStroage.upload(uuid(), file);
  }

}
