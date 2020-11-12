import { Component, Input, OnInit } from '@angular/core';
import { ParamType } from 'src/app/enums/ParamType';
import { SensorStateHelper } from 'src/app/helpers/SensorStateHelper';
import { IStation } from 'src/app/models/IStation';

@Component({
  selector: 'app-station-bubble',
  templateUrl: './station-bubble.component.html',
  styleUrls: ['./station-bubble.component.scss']
})
export class StationBubbleComponent implements OnInit {

  @Input() Station: IStation;
  public SensorStateHelper =  SensorStateHelper;
  public ParamType = ParamType;

  constructor() { }

  ngOnInit(): void {
  }

}
