
import { DataService } from './../services/data.service';
import { GlobalBehaviorService } from './../services/global-behavior.service';
import { Pipe, PipeTransform, ɵConsole } from '@angular/core';
import { IStation } from '../models/IStation';
import { ParamType } from '../enums/ParamType';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  constructor(private globalBehaviorService: GlobalBehaviorService) {
  }

  transform(stations: Array<IStation>, filterValue: string) {
    let newStations = stations.filter(station =>
      station.stationName.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
    );

    newStations = this.FilterStations(newStations);
    this.globalBehaviorService.SearchOnTable(newStations);
    this.globalBehaviorService.FilterValue = filterValue;
    return newStations;
  }

  private FilterStations(stations: Array<IStation>) {

    stations.forEach(station => {
      let output = false;

      if (DataService.IsEnabledNO2) {
        if (station.sensors.some(sensor => sensor.type === ParamType.NO2)) {
          output = true;
        }
      }

      if (DataService.IsEnabledPM10) {
        if (station.sensors.some(sensor => sensor.type === ParamType.PM10)) {
          output = true;
        }
      }

      if (DataService.IsEnabledPM25) {
        if (station.sensors.some(sensor => sensor.type === ParamType.PM25)) {
          output = true;
        }
      }

      if (DataService.IsEnabled03) {
        if (station.sensors.some(sensor => sensor.type === ParamType.O3)) {
          output = true;
        }
      }

      if (DataService.IsEnabledCO2) {
        if (station.sensors.some(sensor => sensor.type === ParamType.CO)) {
          output = true;
        }
      }

      if (DataService.IsEnabledC6H6) {
        if (station.sensors.some(sensor => sensor.type === ParamType.C6H6)) {
          output = true;
        }
      }

      station.isShow = output;
    });

    return stations.filter(station => station.isShow === true);
  }
}
