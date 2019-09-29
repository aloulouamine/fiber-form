import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Site, Planner } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  sites: Site[] = [
    {
      ref: '123',
      missions: [],
      planner: Planner.AXIONE
    },
    {
      ref: '345',
      missions: [],
      planner: Planner.AXIONE
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
