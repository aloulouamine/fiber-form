import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Site } from '../models/Site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  sites: Site[] = [
    {
      ref: '123',
      missions: []
    }
  ]

  constructor() { }


  getSites() {
    of(this.sites);
  }

  addSite(site: Site) {
    this.sites = [...this.sites, site];
    return this.getSites();
  }
}
