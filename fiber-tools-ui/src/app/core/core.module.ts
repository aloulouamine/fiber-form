import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UnauthorizedComponent],
  exports: [UnauthorizedComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
