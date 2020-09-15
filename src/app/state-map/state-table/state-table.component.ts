import { State } from './../../enums/State';
import { Component, OnInit, Input } from '@angular/core';
import { IStation } from 'src/app/models/IStation';
import { ParamType } from 'src/app/enums/ParamType';
import { ISensor } from 'src/app/models/ISensor';

@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.scss']
})
export class StateTableComponent implements OnInit {

  @Input() Stations: Array<IStation>;
  public ParamType = ParamType;
  constructor() { }

  ngOnInit(): void {
  }

  public GetState(type: ParamType, sensors: Array<ISensor>) {
    let output = State[0];

    if (sensors) {
      const findedSensor = sensors.find(sensor => sensor.type === type);

      if (findedSensor) {
        output = State[findedSensor.state];
      }
    }
   
    return output;
  }

}
