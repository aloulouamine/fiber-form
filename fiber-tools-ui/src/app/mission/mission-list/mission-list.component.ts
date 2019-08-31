import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {

  missions = [
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
    { title: 'Mission', content: 'lorem ipsum dolor' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
