import { registerLocaleData } from '@angular/common';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GestureConfig } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { AuthenticatorDirective } from './auth/authenticator.directive';
import { LoginComponent } from './auth/login/login.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home/home.component';
import { metaReducers, reducers } from './reducers';
import { SharedModule } from './shared/shared.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthenticatorDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, //TODO enable period after breaking change .enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
