import { Component, Input, OnInit } from '@angular/core';
import { ParamType } from 'src/app/enums/ParamType';
import { ColorHelper } from 'src/app/helpers/ColorHelper';
import { IStation } from 'src/app/models/IStation';

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
