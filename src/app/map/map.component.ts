import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import FeatureCollection from 'src/assets/data/coordinates.json'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

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
		function OnHover(e) {

			const layer = e.target;

			layer.setStyle({
				weight: 5,
				color: "#3388ff",
				dashArray: "",
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.edge) {
				layer.bringToFront();
			}
    }
    
// --------- GEOJSON --------- //
			geojson = L.geoJSON(FeatureCollection, {
				onEachFeature: function onEachFeature(feature, layer) {
					layer.on({
						mouseover: OnHover,
						mouseout: (e) => {	geojson.resetStyle(e.target)},
						click: (e) => {map.fitBounds(e.target.getBounds()); console.log(e);}
					});
				}
			}).addTo(map);
  }
  
}
