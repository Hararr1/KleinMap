import { ICoordinates } from './../models/ICoordinates';
import { EventEmitter, Injectable } from '@angular/core';
import { Menu } from '../enums/Menu';
import { Router } from '@angular/router';
import { View } from '../enums/View';

@Injectable({
  providedIn: 'root'
})

export class GlobalBehaviorService {
  public SelectedMenu: Menu;
  public SelectedView: View = View.None;
  public FromMapEvent = new EventEmitter<ICoordinates>();
  public FromTableEvent = new EventEmitter<ICoordinates>();

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
    this.FromMapEvent.emit(coordinates);
  }

  public HoverOnTable(coordinates: ICoordinates) {
    this.FromTableEvent.emit(coordinates);
  }
}
