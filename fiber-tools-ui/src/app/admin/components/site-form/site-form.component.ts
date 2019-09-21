import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class SiteFormComponent implements OnInit {

  @Input() site;
  
  constructor() { }

  ngOnInit() {
  }

}
