import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStation } from '../models/IStation';
import { environment } from '../../environments/environment';
import { ISensor } from '../models/ISensor';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  public GetStations(Id: number) {
    return this.httpClient.get<Array<IStation>>(`${environment.apiEndPoint}/GIOS/GetStations?provinceId=${Id}`);
  }

  public GetSensors(IdStation: number) {
    return this.httpClient.get<Array<ISensor>>(`${environment.apiEndPoint}/GIOS/GetSensors?stationId=${IdStation}`);
  }
}
