import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../../services/geo-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(
    private geoDataService: GeoDataService,
    private dataService: DataService) { }

  ngOnInit() {
    this.InitMap();
  }

  // --------- INIT MAP METHODS --------- //

  private InitMap() {
    if (this.dataService.Provinces && this.geoDataService.FeatureCollection) {
      let map;
      let geojson;
      const geoDataServ = this.geoDataService;

      // --------- INIT MAP --------- //
      map = L.map('mapid', {
        center: [52.431563, 18.565166],
        zoom: 6,
        minZoom: 6,
        worldCopyJump: true,
      });

      // --------- GEOJSON --------- //
      geojson = L.geoJSON(this.geoDataService.FeatureCollection, {
        onEachFeature: (feature, layer) => this.OnEachFeature(feature, layer)
      }).addTo(map);

      // --------- CENTER MAP --------- //
      map.fitBounds(geojson.getBounds());
    }
  }

  private OnEachFeature(feature: any, layer: any) {
    layer.on({
      mouseover: (e) => this.OnHover(e),
      mouseout: (e) => this.MouseOut(e),
      click: (e) => this.geoDataService.SelectState(e.target.feature.id)
    });
  }

  private OnHover(e: any) {
    const layer = e.target;

    layer.setStyle({
      fillColor: this.GetColor(e),
      weight: 5,
      color: '#3388ff',
      dashArray: '',
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  private MouseOut(e: any) {

    const layer = e.target;

    layer.setStyle({
      fillColor: '#2C3D55',
      weight: 5,
      color: '#3388ff',
      dashArray: '',
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  private GetColor(e: any) {

    let colour = '#bfbfbf';
    const findedProvince = this.dataService.Provinces.find(province => province.id == e.target.feature.id);

    if (findedProvince) {
      const state =findedProvince.stations[0].provinceState;

      switch (state) {
        case 0:
          colour = '#bfbfbf';
          break;

        case 1:
          colour = '#59b00b';
          break;

        case 2:
          colour = '#b0dd10';
          break;

        case 3:
          colour = '#ffd912';
          break;

        case 4:
          colour = '#e48100';
          break;

        case 5:
          colour = '#e50000';
          break;

        case 6:
          colour = '#9a0002';
          break;
      }
    }

    return colour;
  }
}
