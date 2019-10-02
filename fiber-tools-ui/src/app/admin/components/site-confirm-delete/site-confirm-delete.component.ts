import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Site } from 'src/app/core/models/site';

@Component({
  selector: 'app-site-confirm-delete',
  templateUrl: './site-confirm-delete.component.html',
  styleUrls: ['./site-confirm-delete.component.css']
})
export class SiteConfirmDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public site: Site
  ) { }

  ngOnInit() {
  }

}
