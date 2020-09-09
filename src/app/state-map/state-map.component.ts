import { DataService } from './../services/data.service';
import { State } from './../enums/State';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../services/geo-data.service';
import { ActivatedRoute } from '@angular/router';
import { IStation } from '../models/IStation';

@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
export class StateMapComponent implements OnInit, OnDestroy {

  private map;
  private unknownIcon;
  private veryGoodIcon;
  private goodIcon;
  private okIcon;
  private warningIcon;
  private nonFatalIcon;
  private fatalIcon;
  private selectedId: number;
  private mapMarkers: Array<any> = [];
  public Stations: Array<IStation> = [];

  constructor(
    public geoDataService: GeoDataService,
    private dataServive: DataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedId = +this.route.snapshot.paramMap.get('id');
    this.SetIcon();
    this.InitMap(this.selectedId);

    this.dataServive.DataEmmiter.subscribe((prov: Array<IStation>) => this.UpdateMarkers(prov));
    this.dataServive.StartProvinceDataLoop(this.selectedId);
  }

  ngOnDestroy(): void {
    this.dataServive.StopProvinceDataLoop();
  }

  private InitMap(id: number) {
    // --------- INIT MAP --------- //
    this.map = L.map('mapid', {
      center: [52.431563, 18.565166],
      zoom: 6,
      minZoom: 6,
      worldCopyJump: true
    });

    // --------- GEOJSON --------- //
    if (!this.geoDataService.SelectedState) {
      this.geoDataService.SelectState(id);
    }

    const geojson = L.geoJSON(this.geoDataService.SelectedState).addTo(this.map);
    this.map.fitBounds(geojson.getBounds());
  }

  private UpdateMarkers(province: Array<IStation>) {
    if (province) {
      this.Stations = province;
      this.mapMarkers.forEach(marker => this.map.removeLayer(marker));

      province.forEach(station => {
        const marker = L.marker([+station.gegrLat, +station.gegrLon],
          {
            zIndexOffset: station.state as number,
            icon: this.GetIcon(station.state)
          }).addTo(this.map);

        this.mapMarkers.push(marker);
      });

    }
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
