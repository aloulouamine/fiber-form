import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { noop, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Site } from 'src/app/core/models/site';
import { loadSitesApi } from '../../actions/site.actions';
import * as fromAdmin from '../../reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sitesDataSource$: Observable<MatTableDataSource<Site>>;
  displayedColumns = ['ref', 'missions', 'actions'];


  constructor(
    private store: Store<fromAdmin.State>,
    public router: Router) {
    this.sitesDataSource$ = this.store.pipe(
      select(fromAdmin.getSitesList),
      map(values => new MatTableDataSource(values)),
      tap(dataSource => dataSource.paginator = this.paginator),
      tap(dataSource => dataSource.sort = this.sort)
    );
  }

  ngOnInit() {
    this.store.dispatch(loadSitesApi());
  }

  applyFilter(filterValue: string) {
    this.sitesDataSource$ = this.sitesDataSource$.pipe(
      tap(ds => ds.filter = filterValue.trim().toLowerCase()),
      tap(ds => ds.paginator ? ds.paginator.firstPage() : noop)
    )
  }

  createSite() {
    this.router.navigate(['admin', 'site', 'create']);
  }

  editSite(site: Site) {
    this.router.navigate(['admin', 'site', site.ref])
  }
}
