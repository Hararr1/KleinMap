import { State } from './../enums/State';
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
  private unknownIcon;
  private veryGoodIcon;
  private goodIcon;
  private okIcon;
  private warningIcon;
  private nonFatalIcon;
  private fatalIcon;

  constructor(
    public geoDataService: GeoDataService,
    private route: ActivatedRoute,
    private httpService: HttpService) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    let geojson;

    // --------- INIT MAP --------- //
    this.map = L.map('mapid', {
      center: [52.431563, 18.565166],
      zoom: 6,
      minZoom: 6,
      worldCopyJump: true
    });

    this.SetIcon();
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
    if (!this.geoDataService.SelectedState) {
      this.geoDataService.SelectState(id);
    }

    geojson = L.geoJSON(this.geoDataService.SelectedState).addTo(this.map);
    this.map.fitBounds(geojson.getBounds());

    // --------- DOWNLOAD STATIONS --------- //
    this.httpService.GetStations(id).subscribe(stations => this.SetStations(stations));
  }

  private SetStations(stations: Array<IStation>) {
    console.log(stations.length);
    console.log(stations);
    stations.forEach(station => {
     let marker = L.marker([+station.gegrLat, +station.gegrLon],
        {
          zIndexOffset: station.state as number,
          icon: this.GetIcon(station.state)
        }).addTo(this.map);
    });
  }


  private GetIcon(state: State) {
    let icon;

    switch (state) {
      case State.Unknown:
        icon = this.unknownIcon;
        break;

      case State.VeryGood:
        icon = this.veryGoodIcon;
        break;

      case State.Good:
        icon = this.goodIcon;
        break;

      case State.OK:
        icon = this.okIcon;
        break;

      case State.Warning:
        icon = this.warningIcon;
        break;

      case State.NonFatal:
        icon = this.nonFatalIcon;
        break;

      case State.Fatal:
        icon = this.fatalIcon;
        break;

      default:
        icon = this.unknownIcon;
        break;
    }

    return icon;
  }

  private SetIcon() {

    this.unknownIcon = L.divIcon({
      iconSize: [1, 1],
      iconAnchor: [5, 28],
      html: '<div class="marker Unknown"></div>'
    });

    this.veryGoodIcon = L.divIcon({
      iconSize: [1, 1],
      iconAnchor: [5, 28],
      html: '<div class="marker VeryGood"></div>'
    });

    this.goodIcon = L.divIcon({
      iconSize: [1, 1],
      iconAnchor: [5, 28],
      html: '<div class="marker Good"></div>'
    });

    this.okIcon = L.divIcon({
      iconSize: [1, 1],
      iconAnchor: [5, 28],
      html: '<div class="marker OK"></div>'
    });

    this.warningIcon = L.divIcon({
      iconSize: [1, 1],
      iconAnchor: [5, 28],
      html: '<div class="marker Warning"></div>'
    });

    this.nonFatalIcon = L.divIcon({
      iconSize: [1, 1],
      iconAnchor: [5, 28],
      html: '<div class="marker NonFatal"></div>'
    });

    this.fatalIcon = L.divIcon({
      iconSize: [1, 1],
      iconAnchor: [0, 0],
      html: '<div class="marker Fatal"></div>'
    });

  }

}
