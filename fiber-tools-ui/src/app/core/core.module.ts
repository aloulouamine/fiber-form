import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTechMission from './reducers';
import { MissionEffects } from './effects/mission.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTechMission.TechMissionFeatureKey, fromTechMission.reducer),
    EffectsModule.forFeature([MissionEffects])
  ],
  declarations: [UnauthorizedComponent],
  exports: [
    UnauthorizedComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
