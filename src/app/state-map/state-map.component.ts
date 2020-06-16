import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../services/geo-data.service';

@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
export class StateMapComponent implements OnInit {
  
  constructor(public geoDataService: GeoDataService) { }

  ngOnInit() {

	let map;
	let geojson;
	
// --------- INIT MAP --------- //
		 map = L.map(
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
    geojson = L.geoJSON(this.geoDataService.SelectedState).addTo(map);
    map.fitBounds(geojson.getBounds());
  }

}
