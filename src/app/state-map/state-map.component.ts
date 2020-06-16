import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../services/geo-data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { IStation } from '../models/IStation';

@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
export class StateMapComponent implements OnInit {

  private map;
  constructor(public geoDataService: GeoDataService, private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    let geojson;
	
    // --------- INIT MAP --------- //
		this.map = L.map(
            'mapid', 
            {
            center: [52.431563, 18.565166],
            zoom: 6,
            minZoom: 6,
            worldCopyJump: true
          }
        );

      // --------- EVENT ON HOVER --------- //
      // 	function OnHover(e) {
      // 		const layer = e.target;

      // 		layer.setStyle({
      // 			weight: 5,
      // 			color: "#3388ff",
      // 			dashArray: "",
      // 			fillOpacity: 0.7
      // 		});

      // 		if (!L.Browser.ie && !L.Browser.edge) {
      // 			layer.bringToFront();
      // 		}
      // }
    
    // --------- GEOJSON --------- //
    if (!this.geoDataService.SelectedState) {
      this.geoDataService.SelectState(id);
    } 

    geojson = L.geoJSON(this.geoDataService.SelectedState).addTo(this.map);
    this.map.fitBounds(geojson.getBounds());

    // --------- DOWNLOAD STATIONS --------- //
    this.httpService.GetStations(id).subscribe(stations => this.SetStations(stations));
  }

  private SetStations(stations: Array<IStation>) {

    stations.forEach(station => {
      var marker = L.marker([+station.gegrLat, +station.gegrLon]).addTo(this.map);
    });

  }



}
