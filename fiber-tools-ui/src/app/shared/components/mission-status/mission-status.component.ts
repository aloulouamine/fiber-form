import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { MissionProgressStatus } from 'src/app/core/models/mission';

@Component({
  selector: 'app-mission-status',
  templateUrl: './mission-status.component.html',
  styleUrls: ['./mission-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionStatusComponent implements OnInit, OnChanges {

  @Input() status: MissionProgressStatus;
  @HostBinding('style.color') color: string;

  text: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    switch (this.status) {
      case MissionProgressStatus.BLOCKED: {
        this.text = 'Bloqué';
        this.color = 'red';
        break;
      }
      case MissionProgressStatus.FINISHED: {
        this.text = 'Fini';
        this.color = '';
        break;
      }
      case MissionProgressStatus.IN_PROGRESS: {
        this.text = 'En cours';
        this.color = 'green';
        break;
      }
      default: {
        this.text = 'Nouvelle';
        this.color = 'orange';
      }
    }
  }

}
