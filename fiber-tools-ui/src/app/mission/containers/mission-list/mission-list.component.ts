import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Mission} from '../../../core/models/mission';
import {loadMissionApi} from '../../actions/mission-api.actions';
import * as fromMissions from '../../reducers/mission.reducer';


@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {

  missionsDataSource$: Observable<MatTableDataSource<Mission>>;
  displayedColumn = ['_id', 'number', 'checkPoints', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private store: Store<fromMissions.AppState>,
    private router: Router) {
    this.missionsDataSource$ = store.pipe(
      select(fromMissions.selectUserMissions),
      map(missions => new MatTableDataSource(missions)),
      tap(ds => ds.paginator = this.paginator),
      tap(ds => ds.sort = this.sort)
    )
  }

  ngOnInit() {
    this.store.dispatch(loadMissionApi({workingUser: 'fahdfprime@gmail.com'}));
  }

  applyFilter(filterValue: string) {
    this.missionsDataSource$ = this.missionsDataSource$.pipe(
      tap(ds => ds.filter = filterValue.trim().toLowerCase()),
      tap(ds => ds.paginator && ds.paginator.firstPage())
    );
  }

  editMission(mission) {
    this.router.navigate(['mission', mission._id])
  }
}
