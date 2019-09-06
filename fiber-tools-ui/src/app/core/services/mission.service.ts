import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor() { }


  getMissions(): Observable<any> {
    return of([
      { title: 'Mission', content: 'lorem ipsum dolor' },
      { title: 'Mission', content: 'lorem ipsum dolor' },
      { title: 'Mission', content: 'lorem ipsum dolor' },
      { title: 'Mission', content: 'lorem ipsum dolor' },
      { title: 'Mission', content: 'lorem ipsum dolor' },
    ])
  }
}
