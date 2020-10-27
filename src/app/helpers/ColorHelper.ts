import { State } from './../enums/State';
import { ParamType } from '../enums/ParamType';
import { ISensor } from '../models/ISensor';

export class ColorHelper {
    public GetState(type: ParamType, sensors: Array<ISensor>, isString = true) {
        let output = State[0];
        let output2 = State.Unknown;

        if (sensors) {
            const findedSensor = sensors.find(sensor => sensor.type === type);

            if (findedSensor) {
                output = State[findedSensor.state];
                output2 = findedSensor.state;
            }
        }

        if (isString) {
            return output;
        } else {
            return output2;
        }
    }

    public GetValue(type: ParamType, sensors: Array<ISensor>) {
        let output = 0;

        if (sensors) {
            const findedSensor = sensors.find(sensor => sensor.type === type);

            if (findedSensor) {
                output = findedSensor.currentValue;
            }
        }

        return output;
    }

    public GetColor(type: ParamType, sensors: Array<ISensor>){

        let color = '$Unknown';
        const state = this.GetState(type, sensors, false);

        if (state as State) {
            switch (state) {
                case State.Unknown:
                    color = '#bfbfbf';
                    break;

                case State.VeryGood:
                    color = '#59b00b';
                    break;

                case State.Good:
                    color = '#b0dd10';
                    break;

                case State.OK:
                    color = '$#ffd912';
                    break;

                case State.Warning:
                    color = '#e48100';
                    break;

                case State.NonFatal:
                    color = '#e50000';
                    break;

                case State.Fatal:
                    color = '#9a0002';
                    break;
            }
        }
        return color;
    }
}