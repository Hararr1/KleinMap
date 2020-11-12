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
  public static IsEnabledNO2 = true;
  public static IsEnabledPM10 = true;
  public static IsEnabledPM25 = true;
  public static IsEnabled03 = true;
  public static IsEnabledCO2 = true;
  public static IsEnabledC6H6 = true;
  public static IsEnabledSO2 = true;

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

    for (let i = 1; i <= 16; i++) {
      this.httpService.GetStations(i)
        .toPromise().then(stations => {
          const province = new Object() as IProvince;
          province.id = i;
          province.stations = stations;

          const findedIndex = this.Provinces.findIndex(p => p.id === province.id);

          if (findedIndex !== -1) {
            this.Provinces[findedIndex].stations = stations;
          } else {
            this.Provinces.push(province);
          }
        });
    }

    // TODO JAKIŚ UPDATE A NIE PRZYPISANIE NOWYCH DANYCH
    // this.Provinces = newProvinces;
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
