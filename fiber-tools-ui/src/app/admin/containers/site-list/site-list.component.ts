import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { noop, Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { Site, Planner } from 'src/app/core/models/site';
import { query, add, remove } from '../../actions/site.actions';
import * as fromAdmin from '../../reducers';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SiteConfirmDeleteComponent } from '../../components/site-confirm-delete/site-confirm-delete.component';

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
      tap(ds => ds.paginator ? ds.paginator.firstPage() : noop)
    )
  }

  createSite() {
    this.store.dispatch(add({
      payload: {
        planner: Planner.AXIONE,
        ref: '123'
      }
    }));
    //this.router.navigate(['admin', 'site', 'create']);
  }

  editSite(site: Site) {
    this.router.navigate(['admin', 'site', site.ref])
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
