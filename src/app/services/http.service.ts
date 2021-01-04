import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IStation } from '../models/IStation';
import { environment } from '../../environments/environment';
import { ISensor } from '../models/ISensor';
import { ISubscriber } from '../models/ISubscriber';

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

  public AddNewSubscriber(newSub: ISubscriber) {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(newSub);
    return this.httpClient.post(`${environment.apiEndPoint}/Subscribe/AddNewSubscriber`, body, {'headers': headers});
  }

  public VerifyCode(userId: number, hash: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const body =  JSON.stringify({'userId': userId, 'hash': hash});
    return this.httpClient.put(`${environment.apiEndPoint}/Subscribe/VerifyCode?userId=${userId}&hash=${hash}`, body, {headers})
  }
}
