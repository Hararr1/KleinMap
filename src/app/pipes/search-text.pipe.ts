import { DataService } from './../services/data.service';
import { GlobalBehaviorService } from './../services/global-behavior.service';
import { Pipe, PipeTransform } from '@angular/core';
import { IStation } from '../models/IStation';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  constructor(private globalBehaviorService: GlobalBehaviorService) {
  }

  transform(stations: Array<IStation>, filterValue: string) {
    const newStations = stations.filter(station =>
      station.stationName.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

    this.globalBehaviorService.FilterValue = filterValue;
    this.globalBehaviorService.SearchOnTable(newStations);

    return newStations;
  }
}
