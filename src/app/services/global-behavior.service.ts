import { Injectable } from '@angular/core';
import { Menu } from '../enums/Menu';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GlobalBehaviorService {

  constructor(private router: Router) { }

  public ChangeSelectedMenu(menu: Menu) {

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
}
