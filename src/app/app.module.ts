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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MapComponent,
    SettingsComponent,
    AnalyticsComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [GlobalBehaviorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
