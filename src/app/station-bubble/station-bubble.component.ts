import { Component, Input, OnInit } from '@angular/core';
import { ParamType } from '../enums/ParamType';
import { State } from '../enums/State';
import { ColorHelper } from '../helpers/ColorHelper';
import { IStation } from '../models/IStation';

@Component({
  selector: 'app-station-bubble',
  templateUrl: './station-bubble.component.html',
  styleUrls: ['./station-bubble.component.scss']
})
export class StationBubbleComponent implements OnInit {

  @Input() Station: IStation;
  public IconHelper: ColorHelper = new ColorHelper();
  public ParamType = ParamType;

  constructor() { }

  ngOnInit(): void {
  }

}
