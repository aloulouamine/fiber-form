import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private afs: AngularFirestore) { }


  getSites(): Observable<DocumentChangeAction<Site>[]> {
    return this.afs.collection<Site>('sites').stateChanges()
  }

  addSite(site: Site) {

  }
}
