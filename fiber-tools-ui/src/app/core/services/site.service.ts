import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  sites: Site[] = [
    {
      ref: '123',
      missions: []
    },
    {
      ref: '345',
      missions: []
    }
  ]

  constructor() { }


  getSites(): Observable<Site[]> {
    return of(this.sites);
  }

  addSite(site: Site) {
    this.sites = [...this.sites, site];
    return this.getSites();
  }
}
