import { HttpService } from './http.service';
import { Injectable, EventEmitter } from '@angular/core';
import { IProvince } from '../models/IProvince';
import { IStation } from '../models/IStation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public Provinces: Array<IProvince> = [];
  private allInterval;
  public DataEmmiter: EventEmitter<Array<IStation>> = new EventEmitter();
  private provinceInterval;

  constructor(private httpService: HttpService) { }

  public StartAllDataLoop() {
    this.GetData();
    this.allInterval = setInterval(() => this.GetData(), 5000);
  }

  public Update() {
    this.GetData();
  }

  public StopAllDataLoop() {
    clearInterval(this.allInterval);
  }

  private GetData() {
    let newProvinces: Array<IProvince> = [];

    for (let i = 1; i <= 16; i++) {
      this.httpService.GetStations(i)
        .toPromise().then(stations => {
          const province = new Object() as IProvince;
          province.id = i;
          province.stations = stations;

          newProvinces.push(province);
        });
    }

    this.Provinces = newProvinces;
  }

  public StartProvinceDataLoop(id: number) {
    this.GetDataInProvince(id);
    this.provinceInterval = setInterval(() => this.GetDataInProvince(id), 5000);
  }

  public StopProvinceDataLoop() {
    clearInterval(this.provinceInterval);
  }

  private GetDataInProvince(id: number) {
    this.httpService.GetStations(id).toPromise().then(stations => {
      this.DataEmmiter.emit(stations);
    });
  }

}
