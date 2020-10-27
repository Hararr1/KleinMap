import { SearchTextPipe } from './../../pipes/search-text.pipe';
import { DataService } from './../../services/data.service';
import { ICoordinates } from './../../models/ICoordinates';
import { GlobalBehaviorService } from './../../services/global-behavior.service';
import { Component, OnInit } from '@angular/core';
import { IStation } from 'src/app/models/IStation';
import { ParamType } from 'src/app/enums/ParamType';
import { ColorHelper } from 'src/app/helpers/ColorHelper';

@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.scss']
})
export class StateTableComponent implements OnInit {

  public filterValue: string = '';
  public SelectedStation: IStation;
  public ParamType = ParamType;
  public IconHelper: ColorHelper = new ColorHelper();
  public DataService = DataService;
  constructor(private globalBehaviorService: GlobalBehaviorService, private searchTextPipe: SearchTextPipe) { }

  ngOnInit(): void {
    this.globalBehaviorService.FromMapHoverEvent.subscribe((coordinates: ICoordinates) => this.HoverStation(coordinates));
  }

  private HoverStation(coordinates: ICoordinates) {
    this.SelectedStation = this.DataService.Stations
      .find(station => +station.gegrLat === coordinates.lat && +station.gegrLon === coordinates.lng);
  }

  public StationHover(station: IStation) {

    this.SelectedStation = station;

    const coordinates = new Object () as ICoordinates;
    coordinates.lat = +station.gegrLat;
    coordinates.lng = +station.gegrLon;

    this.globalBehaviorService.HoverOnTable(coordinates);
  }

  public FilterStations() {
    this.searchTextPipe.transform(DataService.Stations, this.globalBehaviorService.FilterValue);
    DataService.Stations = [...DataService.Stations];
  }

}
