import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private siteCollection: AngularFirestoreCollection<Site>;

  constructor(private afs: AngularFirestore) {
    this.siteCollection = this.afs.collection<Site>('sites');
  }


  getSites(): Observable<DocumentChangeAction<Site>[]> {
    return this.siteCollection.stateChanges();
  }

  addSite(site: Site) {
    return this.siteCollection.add(site);
  }

  removeSite(site: Site): Observable<void> {
    if (site.id) {
      return from(this.siteCollection.doc(site.id).delete())
    } else {
      throw 'No id found in site';
    }
  }
}
