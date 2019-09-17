import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
const usersCollection = 'users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afs: AngularFirestore) { }
  public getTireurs() {
    return this.afs.collection(
      usersCollection,
      ref => ref.where('roles', 'array-contains', 'TIREUR'
      ))
      .valueChanges()
  }

  public getUserByEmail(email: string) {
    return this.afs.collection(usersCollection)
      .doc(email)
      .valueChanges()
  }
}
