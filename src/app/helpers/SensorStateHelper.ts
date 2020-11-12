import { State } from '../enums/State';
import { ParamType } from '../enums/ParamType';
import { ISensor } from '../models/ISensor';

export class SensorStateHelper {

    public static GetColorByState(state: State) {

        let color;

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

        return color;
    }

    public static GetColorByType(index: number) {
        let output = 'red';

        switch (index) {
            case 0:
                output = '#7cdbff';
                break;

            case 1:
                output = '#fd79b6';
                break;

            case 2:
                output = '#00ffad';
                break;

            case 3:
                output = '#da44ff';
                break;

            case 4:
                output = '#426bff';
                break;

            case 5:
                output = '#1000ff';
                break;

            case 6:
                output = '#ff8100';
                break;

            default:
                output = 'red';
                break;
        }

        return output;
    }

    public static GetDescriptionState(state: State) {
        let description;

        switch (state) {
            case State.Unknown:
                description = 'Unknown';
                break;

            case State.VeryGood:
                description = 'Very Good';
                break;

            case State.Good:
                description = 'Good';
                break;

            case State.OK:
                description = 'OK';
                break;

            case State.Warning:
                description = 'Warning';
                break;

            case State.NonFatal:
                description = 'Non-fatal';
                break;

            case State.Fatal:
                description = 'Fatal';
                break;
        }

        return description;
    }

    public static GetNameState(type: ParamType) {
        let output = 'Unknown';

        switch (type) {
            case ParamType.C6H6:
                output = 'C6H6';
                break;

            case ParamType.CO:
                output = 'CO2';
                break;

            case ParamType.NO2:
                output = 'NO2';
                break;

            case ParamType.O3:
                output = 'O3';
                break;

            case ParamType.PM10:
                output = 'PM10';
                break;

            case ParamType.PM25:
                output = 'PM25';
                break;

            case ParamType.SO2:
                output = 'SO2';
                break;

            default:
                output = 'Unknown';
                break;
        }

        return output;
    }

    public static GetState(type: ParamType, sensors: Array<ISensor>, isString = true) {
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

    public static GetValue(type: ParamType, sensors: Array<ISensor>) {
        let output = 0;

        if (sensors) {
            const findedSensor = sensors.find(sensor => sensor.type === type);

            if (findedSensor) {
                output = findedSensor.currentValue;
            }
        }

        return output;
    }

    public static GetColor(type: ParamType, sensors: Array<ISensor>) {

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