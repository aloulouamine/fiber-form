import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';
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

  public getUsers(): Observable<DocumentChangeAction<User>[]> {
    return this.afs.collection<User>(usersCollection).stateChanges();
  }
}
