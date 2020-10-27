import { ICoordinates } from './../models/ICoordinates';
import { EventEmitter, Injectable } from '@angular/core';
import { Menu } from '../enums/Menu';
import { Router } from '@angular/router';
import { View } from '../enums/View';
import { IStation } from '../models/IStation';

@Injectable({
  providedIn: 'root'
})

export class GlobalBehaviorService {
  public SelectedMenu: Menu;
  public SelectedView: View = View.None;
  public FromMapHoverEvent = new EventEmitter<ICoordinates>();
  public FromTableHoverEvent = new EventEmitter<ICoordinates>();
  public FromTableSearchEvent = new EventEmitter<Array<IStation>>();
  public FilterValue = '';

  constructor(private router: Router) {
  }

  public ChangeSelectedMenu(menu: Menu) {
    this.SelectedMenu = menu;


    switch (menu) {

      case Menu.Alarm:
        this.router.navigate(['/alarm']);
        break;

      case Menu.Analytics:
        this.router.navigate(['/analytics']);
        break;

      case Menu.Map:
        this.router.navigate(['/map']);
        break;

      case Menu.Settings:
        this.router.navigate(['/settings']);
        break;

    }

  }

  public ChangeSelectedView(view: View) {
    this.SelectedView = view;
  }

  public HoverOnMap(coordinates: ICoordinates) {
    this.FromMapHoverEvent.emit(coordinates);
  }

  public HoverOnTable(coordinates: ICoordinates) {
    this.FromTableHoverEvent.emit(coordinates);
  }
  
  public SearchOnTable(stations: Array<IStation>) {
    this.FromTableSearchEvent.emit(stations);
  }
}
