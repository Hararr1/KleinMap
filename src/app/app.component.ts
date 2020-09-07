import { Component } from '@angular/core';
import { GeoDataService } from './services/geo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {

  constructor(
    public GeoDataService: GeoDataService) { }
}
