import { environment } from './../../environments/environment';
import { HttpService } from './http.service';
import { Injectable, EventEmitter } from '@angular/core';
import { IProvince } from '../models/IProvince';
import { IStation } from '../models/IStation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public static Stations: Array<IStation> = [];
  public static IsEnabledNO2 = false;
  public static IsEnabledPM10 = false;
  public static IsEnabledPM25 = false;
  public static IsEnabled03 = false;
  public static IsEnabledCO2 = true;
  public static IsEnabledC6H6 = true;

  public Provinces: Array<IProvince> = [];
  private allInterval;
  public DataEmmiter: EventEmitter<Array<IStation>> = new EventEmitter();
  private provinceInterval;

  constructor(private httpService: HttpService) { }

  public StartAllDataLoop() {
    this.GetData();
    this.allInterval = setInterval(() => this.GetData(), environment.interval);
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
    this.provinceInterval = setInterval(() => this.GetDataInProvince(id), environment.interval);
  }

  public StopProvinceDataLoop() {
    clearInterval(this.provinceInterval);
  }

  private GetDataInProvince(id: number) {
    this.httpService.GetStations(id).toPromise().then(stations => {
      this.DataEmmiter.emit(stations);
      DataService.Stations = stations;
    });
  }

}
