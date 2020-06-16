import { Injectable } from '@angular/core';
import { Menu } from '../enums/Menu';

@Injectable({
  providedIn: 'root'
})

export class GlobalBehaviorService {

  public SelectedMenu: Menu = Menu.Map;
  constructor() { }

  public ChangeSelectedMenu(menu: Menu) {
    this.SelectedMenu = menu;
  }
}
