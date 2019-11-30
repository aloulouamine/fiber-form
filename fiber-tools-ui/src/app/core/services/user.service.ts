import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, mergeMap, publishReplay, refCount } from 'rxjs/operators';
import { Roles, User } from '../models/user';

const usersCollection = 'users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }


  currentUserCache$ = this.getCurrentUserEmail().pipe(
    mergeMap(email => this.getUserByEmail(email)),
    publishReplay(1),
    refCount()
  )

  public getCurrentUser() {
    return this.afAuth.user;
  }

  public getTireurs() {
    return this.afs.collection(
      usersCollection,
      ref => ref.where('roles', 'array-contains', 'TIREUR'
      ))
      .valueChanges();
  }

  public getUserByEmail(email: string) {
    return this.afs.collection(usersCollection)
      .doc<User>(email)
      .valueChanges();
  }

  public getUsers(): Observable<DocumentChangeAction<User>[]> {
    return this.afs.collection<User>(usersCollection).stateChanges();
  }

  public getCurrentUserEmail(): Observable<string> {
    return this.afAuth.user.pipe(map(user => user.email));
  }

  public isCurrentUserAdmin(): Observable<boolean> {
    return this.currentUserCache$.pipe(
      map(u => u.roles_v2.admin)
    );
  }
  public isCurrentUserSupervisor(): Observable<boolean> {
    return this.currentUserCache$.pipe(
      map(u => u.roles_v2.supervisor)
    );
  }

  public getCurrentUserRoles(): Observable<Roles> {
    return this.currentUserCache$.pipe(
      map(u => u.roles_v2)
    );
  }

}
