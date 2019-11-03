import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Site } from 'src/app/core/models/site';
import { query, remove } from '../../actions/site.actions';
import { SiteConfirmDeleteComponent } from '../../components/site-confirm-delete/site-confirm-delete.component';
import * as fromAdmin from '../../reducers';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sitesDataSource$: Observable<MatTableDataSource<Site>>;
  displayedColumns = ['id', 'siteFromFilename', 'provider', 'creationDate', 'actions'];


  constructor(
    private store: Store<fromAdmin.State>,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.sitesDataSource$ = this.store.pipe(
      select(fromAdmin.sitesSelectors.selectAll),
      map(values => new MatTableDataSource(values)),
      tap(dataSource => dataSource.paginator = this.paginator),
      tap(dataSource => dataSource.sort = this.sort)
    );
  }

  ngOnInit() {
    this.store.dispatch(query());
  }

  applyFilter(filterValue: string) {
    this.sitesDataSource$ = this.sitesDataSource$.pipe(
      tap(ds => ds.filter = filterValue.trim().toLowerCase()),
      tap(ds => ds.paginator && ds.paginator.firstPage())
    );
  }

  createSite() {
    this.router.navigate(['admin', 'site', 'create']);
  }

  editSite(site: Site) {
    this.router.navigate(['admin', 'site', site.id, 'mission']);
  }

  removeSite(site: Site) {
    const dialogRef = this.dialog.open(SiteConfirmDeleteComponent, {
      data: site
    });
    dialogRef
      .afterClosed()
      .pipe(filter(r => r))
      .subscribe(
        () => this.store.dispatch(remove({
          payload: site
        }))
      );

  }
}
