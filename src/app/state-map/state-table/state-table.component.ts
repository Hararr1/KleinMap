import { ICoordinates } from './../../models/ICoordinates';
import { GlobalBehaviorService } from './../../services/global-behavior.service';
import { State } from './../../enums/State';
import { Component, OnInit, Input } from '@angular/core';
import { IStation } from 'src/app/models/IStation';
import { ParamType } from 'src/app/enums/ParamType';
import { ISensor } from 'src/app/models/ISensor';
import { ColorHelper } from 'src/app/helpers/ColorHelper';

@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.scss']
})
export class StateTableComponent implements OnInit {

  @Input() Stations: Array<IStation>;
  public SelectedStation: IStation;
  public ParamType = ParamType;
  public IconHelper: ColorHelper = new ColorHelper();
  constructor(private globalBehaviorService: GlobalBehaviorService) { }

  ngOnInit(): void {
    this.globalBehaviorService.FromMapEvent.subscribe((coordinates: ICoordinates) => this.HoverStation(coordinates));
  }
  
  private HoverStation(coordinates: ICoordinates) {
    this.SelectedStation = this.Stations.find(station => +station.gegrLat === coordinates.lat && +station.gegrLon === coordinates.lng);
  }

  public StationHover(station: IStation) {
  
    this.SelectedStation = station;

    const coordinates = new Object () as ICoordinates;
    coordinates.lat = +station.gegrLat;
    coordinates.lng = +station.gegrLon;

    this.globalBehaviorService.HoverOnTable(coordinates);
  }

}
