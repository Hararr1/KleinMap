import { ICommune } from './ICommune';

export interface ICity {
  id: number;
  name: string;
  commune: ICommune;
}