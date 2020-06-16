import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../services/geo-data.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	constructor(private geoDataService: GeoDataService) { }

	ngOnInit() {

		let map;
		let geojson;
		let geoDataServ = this.geoDataService;

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
				fillColor: getColor(e),
				weight: 5,
				color: "#3388ff",
				dashArray: "",
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.edge) {
				layer.bringToFront();
			}
		}

		// --------- COLOR ON HOVER --------- //
		function getColor(e) {
			// TODO: Download the worst state.
			return 'green';
		}
		// --------- GEOJSON --------- //
		geojson = L.geoJSON(this.geoDataService.FeatureCollection, {
			onEachFeature: function onEachFeature(feature, layer) {
				layer.on({
					mouseover: OnHover,
					mouseout: (e) => { geojson.resetStyle(e.target) },
					click: (e) => { geoDataServ.SelectState(e.target.feature.id) }
				});
			}
		}).addTo(map);

		// --------- CENTER MAP --------- //
		map.fitBounds(geojson.getBounds());
	}

}
