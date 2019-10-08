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

  missions$: Observable<Mission[]>;
  displayedColumns = ['id', 'number', 'checkPoints', 'actions'];
  
  constructor(
    private store: Store<fromMissions.AppState>,
    private router: Router) {
    this.missions$ = store.pipe(
      select(fromMissions.selectUserMissions),
    )
  }

  ngOnInit() {
    this.store.dispatch(loadMissionApi({workingUser: 'fahdfprime@gmail.com'}));
  }


  editMission(mission) {
    this.router.navigate(['mission', mission._id])
  }
}
