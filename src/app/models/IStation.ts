import { ICity } from './ICity';
import { ISensor } from './ISensor';
import { State } from '../enums/State';

export interface IStation {
  id: number;
  stationName: string;
  gegrLat: string;
  gegrLon: string;
  city: ICity;
  addressStreet?: string;
  sensors: Array<ISensor>;
  state: State;
  lastUpdate: string;
}
