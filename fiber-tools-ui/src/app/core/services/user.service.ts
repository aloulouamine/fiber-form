import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }
  public getTireurs() {
    return this.afs.collection('users', ref => ref.where('roles', 'array-contains', 'TIREUR')).valueChanges()
  }
}
