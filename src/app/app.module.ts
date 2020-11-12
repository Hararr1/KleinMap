import { StationDetailsComponent } from './Views/station-details/station-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GlobalBehaviorService } from './services/global-behavior.service';
import { SafeStylePipe } from './pipes/SafeStyle';
import { SearchTextPipe } from './pipes/search-text.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { AlarmComponent } from './Views/alarm/alarm.component';
import { AnalyticsComponent } from './Views/analytics/analytics.component';
import { FooterComponent } from './Views/footer/footer.component';
import { HeaderComponent } from './Views/header/header.component';
import { MapComponent } from './Views/map/map.component';
import { StateMapComponent } from './Views/province/state-map/state-map.component';
import { StateTableComponent } from './Views/province/state-table/state-table.component';
import { SettingsComponent } from './Views/settings/settings.component';
import { StationBubbleComponent } from './Views/station-bubble/station-bubble.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MapComponent,
    SettingsComponent,
    AnalyticsComponent,
    AlarmComponent,
    StateMapComponent,
    StateTableComponent,
    StationBubbleComponent,
    SafeStylePipe,
    SearchTextPipe,
    StationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    FormsModule
  ],
  providers: [GlobalBehaviorService, HttpService, SearchTextPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
