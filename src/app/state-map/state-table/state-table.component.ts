import { Component, OnInit, Input } from '@angular/core';
import { IStation } from 'src/app/models/IStation';

@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.scss']
})
export class StateTableComponent implements OnInit {

  @Input() Stations: Array<IStation>;
  constructor() { }

  ngOnInit(): void {
  }

}
