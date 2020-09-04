import { IParamData } from './IParamData';
import { IParameters } from './IParameters';
import { State } from '../enums/State';
import { ParamType } from '../enums/ParamType';

export interface ISensor {
    id: number;
    stationId: number;
    param: IParameters;
    lastUpdate: string;
    data: IParamData;
    type: ParamType;
    state: State;
    worstValue: number;
}
