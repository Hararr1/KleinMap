import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStation } from '../models/IStation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  public GetStations(Id: number) {
    return this.httpClient.get<Array<IStation>>(`${environment.apiEndPoint}/GIOS?Id=${Id}`);
  }
}
