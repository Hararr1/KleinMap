import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { SettingsComponent } from './services/settings/settings.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AlarmComponent } from './alarm/alarm.component';
import { StateMapComponent } from './state-map/state-map.component';


const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'map', component: MapComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'state/:id', component: StateMapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
