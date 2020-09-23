import { ICoordinates } from './../models/ICoordinates';
import { StationBubbleComponent } from './../station-bubble/station-bubble.component';
import { GlobalBehaviorService } from './../services/global-behavior.service';
import { DataService } from './../services/data.service';
import { State } from './../enums/State';
import { Component, OnInit, OnDestroy, ComponentFactoryResolver, Injector } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../services/geo-data.service';
import { ActivatedRoute } from '@angular/router';
import { IStation } from '../models/IStation';
import { View } from '../enums/View';
import { Menu } from '../enums/Menu';

@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
export class StateMapComponent implements OnInit, OnDestroy {

  private map;
  private selectedId: number;
  private mapMarkers: Array<any> = [];
  public Stations: Array<IStation> = [];
  public View = View;

  constructor(
    public geoDataService: GeoDataService,
    private dataServive: DataService,
    private route: ActivatedRoute,
    public GlobalBehaviorService: GlobalBehaviorService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) { }

  ngOnInit() {
    this.GlobalBehaviorService.SelectedMenu = Menu.StateMap;
    this.selectedId = +this.route.snapshot.paramMap.get('id');
    this.InitMap(this.selectedId);

    this.dataServive.DataEmmiter.subscribe((prov: Array<IStation>) => this.UpdateMarkers(prov));
    this.dataServive.StartProvinceDataLoop(this.selectedId);
    this.GlobalBehaviorService.FromTableEvent.subscribe((coords: ICoordinates) => this.HoverStation(coords))
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
            icon: this.GetIcon(station.state, station.city.name)
          }).addTo(this.map)
          .bindPopup(this.CreateCustomPopup(station));

        // Zdarzenia
        // marker.on('mouseover', () => {
        //   marker.openPopup();
        //   this.map.setView(marker.getLatLng(), 11);
        // });

        marker.on('click', () => {
          marker.openPopup();
          this.map.setView(marker.getLatLng(), 9);
        });

        marker.on('mouseover', () => {
          const coordinates: ICoordinates = marker.getLatLng();
          this.map.setView(coordinates, 9);

          this.GlobalBehaviorService.HoverOnMap(coordinates);
        });

        this.mapMarkers.push(marker);
      });

    }
  }

  private GetIcon(state: State, name: string) {
    let icon;

    switch (state) {
      case State.Unknown:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [5, 28],
          html: `<div class="mapMarker marker Unknown"></div><p>${name}<p/>`
        });
        break;

      case State.VeryGood:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [5, 28],
          html: `<div class="mapMarker marker VeryGood"></div><p>${name}<p/>`
        });
        break;

      case State.Good:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [5, 28],
          html: `<div class="mapMarker marker Good"></div><p>${name}<p/>`
        });
        break;

      case State.OK:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [5, 28],
          html: `<div class="mapMarker marker OK"></div><p>${name}<p/>`
        });
        break;

      case State.Warning:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [5, 28],
          html: `<div class="mapMarker marker Warning"></div><p>${name}<p/>`
        });
        break;

      case State.NonFatal:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [5, 28],
          html: `<div class="mapMarker marker NonFatal"></div><p>${name}<p/>`
        });
        break;

      case State.Fatal:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [0, 0],
          html: `<div class="mapMarker marker Fatal"></div><p>${name}<p/>`
        });
        break;

      default:
        icon = L.divIcon({
          iconSize: [1, 1],
          iconAnchor: [5, 28],
          html: `<div class="mapMarker marker Unknown"></div><p>${name}<p/>`
        });
        break;
    }

    return icon;
  }

  private CreateCustomPopup(station: IStation) {

    const factory = this.componentFactoryResolver.resolveComponentFactory(
      StationBubbleComponent
    );

    const component = factory.create(this.injector);

    // Inputs:
    component.instance.Station = station;

    // Manually invoke change detection
    component.changeDetectorRef.detectChanges();

    return component.location.nativeElement;

  }

  private HoverStation(coords: ICoordinates) {
    const findedMarker = this.mapMarkers.find(marker => {
      let coordinates = new Object() as ICoordinates;
      coordinates = marker.getLatLng();

      if (coordinates.lat === coords.lat && coordinates.lng === coords.lng) {
        return marker;
      }
    });

    findedMarker.openPopup();
    this.map.setView(findedMarker.getLatLng(), 9);
  }

}
