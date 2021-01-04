
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmComponent } from './Views/alarm/alarm.component';
import { AnalyticsComponent } from './Views/analytics/analytics.component';
import { DailyConfirmComponent } from './Views/daily-confirm/daily-confirm.component';
import { MapComponent } from './Views/map/map.component';
import { StateMapComponent } from './Views/province/state-map/state-map.component';
import { SettingsComponent } from './Views/settings/settings.component';
import { StationDetailsComponent } from './Views/station-details/station-details.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'map', component: MapComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'state/:id', component: StateMapComponent},
  { path: 'state/:idState/station/:id', component: StationDetailsComponent },
  { path: 'daily/userId/:userId/code/:code', component: DailyConfirmComponent},
  { path: 'daily', component: DailyConfirmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
