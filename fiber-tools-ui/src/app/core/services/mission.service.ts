import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MissionService {
  missions = [
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
  ];


  constructor() { }


  getMissions(): Observable<any> {
    return of(this.missions)
  }

  addMission(mission: any): Observable<any> {
    this.missions = [...this.missions, mission];
    return of(this.missions);
  }
}
