import { DataService } from './services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeoDataService } from './services/geo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]


})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    public GeoDataService: GeoDataService,
    public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.StartAllDataLoop();
    console.log("THERE")
  }
  
  ngOnDestroy(): void {
    this.DataService.StopAllDataLoop();
  }

}
