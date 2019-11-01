import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mission } from 'src/app/core/models/mission';


@Component({
  selector: 'app-missions-table',
  templateUrl: './missions-table.component.html',
  styleUrls: ['./missions-table.component.css']
})
export class MissionsTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() missions: Mission[];
  @Input() displayedColumns: string[];

  @Output() edit = new EventEmitter<Mission>();
  @Output() report = new EventEmitter<Mission>();

  missionsDataSource: MatTableDataSource<Mission>;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.missions) {
      this.missionsDataSource = new MatTableDataSource(this.missions);
      this.missionsDataSource.paginator = this.paginator;
      this.missionsDataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    this.missionsDataSource.filter = filterValue.trim().toLowerCase();
    this.missionsDataSource.paginator && this.missionsDataSource.paginator.firstPage();
  }

}
