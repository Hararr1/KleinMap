import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MapComponent } from './map/map.component';
import { GlobalBehaviorService } from './services/global-behavior.service';
import { SettingsComponent } from './services/settings/settings.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AlarmComponent } from './alarm/alarm.component';
import { StateMapComponent } from './state-map/state-map.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'map', component: MapComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'state/:id', component: StateMapComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MapComponent,
    SettingsComponent,
    AnalyticsComponent,
    AlarmComponent,
    StateMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(routes)
  ],
  providers: [GlobalBehaviorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
