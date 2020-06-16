import { ICity } from './ICity';

export interface IStation {
  id: number;
  stationName: string;
  gegrLat: string;
  gegrLon: string;
  city: ICity;
  addressStreet?: string;
}