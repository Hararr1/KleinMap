import { GeoDataService } from './../../../services/geo-data.service';
import { SearchTextPipe } from '../../../pipes/search-text.pipe';
import { DataService } from '../../../services/data.service';
import { ICoordinates } from '../../../models/ICoordinates';
import { GlobalBehaviorService } from '../../../services/global-behavior.service';
import { Component, OnInit } from '@angular/core';
import { IStation } from 'src/app/models/IStation';
import { ParamType } from 'src/app/enums/ParamType';
import { SensorStateHelper } from 'src/app/helpers/SensorStateHelper';

@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.scss']
})
export class StateTableComponent implements OnInit {

  public filterValue: string = '';
  public SelectedStation: IStation;
  public ParamType = ParamType;
  public SensorStateHelper = SensorStateHelper;
  public DataService = DataService;

  constructor(
    private globalBehaviorService: GlobalBehaviorService,
    public GeoDataService: GeoDataService,
    private searchTextPipe: SearchTextPipe) { }

  ngOnInit(): void {
    this.globalBehaviorService.FromMapHoverEvent.subscribe((coordinates: ICoordinates) => this.HoverStation(coordinates));
  }

  private HoverStation(coordinates: ICoordinates) {
    console.log(coordinates);
    this.SelectedStation = this.DataService.Stations
      .find(station => +station.gegrLat === coordinates.lat && +station.gegrLon === coordinates.lng);
  }

  public ShowStationBubble(station: IStation) {

    this.SelectedStation = station;

    const coordinates = new Object () as ICoordinates;
    coordinates.lat = +station.gegrLat;
    coordinates.lng = +station.gegrLon;

    this.globalBehaviorService.ClickOnTable(coordinates);
  }

  public FilterStations() {
    this.searchTextPipe.transform(DataService.Stations, this.globalBehaviorService.FilterValue);
    DataService.Stations = [...DataService.Stations];
  }

}
