import { Component, OnInit, Input } from '@angular/core';
import { CheckPoint } from 'src/app/core/models/mission';
import { CHECK_POINT_TYPE } from 'src/app/core/enum/check-point-type';

@Component({
  selector: 'app-check-point-icon',
  templateUrl: './check-point-icon.component.html',
  styleUrls: ['./check-point-icon.component.css']
})
export class CheckPointIconComponent implements OnInit {

  @Input() checkPoint: CheckPoint;

  constructor() { }

  ngOnInit() {
  }

  getIconName(checkPointType: CHECK_POINT_TYPE) {
    switch (checkPointType) {
      case CHECK_POINT_TYPE.FACADE:
        return 'home';
      case CHECK_POINT_TYPE.ARMOIRE:
        return 'settings_input_hdmi';
      case CHECK_POINT_TYPE.CHAMBRE_FRANCE_TELECOM:
      case CHECK_POINT_TYPE.SOUTE:
        return 'dns';
      case CHECK_POINT_TYPE.POTEAU:
      case CHECK_POINT_TYPE.POTEAU_BETON_N10:
      case CHECK_POINT_TYPE.POTEAU_FRANCE_TELECOM:
      case CHECK_POINT_TYPE.NOUVEAU_POTEAU:
        return 'settings_input_antenna';
      default:
        return 'room';
    }
  }

  invertBackground(color): boolean {
    if (color === '#000000') {
      return true;
    }
    return false;
  }
}
