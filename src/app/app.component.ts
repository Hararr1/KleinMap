import { Component } from '@angular/core';
import { GlobalBehaviorService } from './services/global-behavior.service';
import { Menu } from './enums/Menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public Menu = Menu;
  constructor(public GlobalBehaviorService: GlobalBehaviorService) {}
}
