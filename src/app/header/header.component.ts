import { GlobalBehaviorService } from './../services/global-behavior.service';
import { Component, OnInit } from '@angular/core';
import { View } from '../enums/View';
import { Menu } from '../enums/Menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public View = View;
  public Menu = Menu;

  constructor(public GlobalBehaviorService: GlobalBehaviorService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 800) {
      this.GlobalBehaviorService.SelectedView = View.Map;
    };
  }

  public ResizeWindow(event) {
    const width = event.target.innerWidth;

    if (width <= 800 && this.GlobalBehaviorService.SelectedView === View.None) {
      this.GlobalBehaviorService.SelectedView = View.Map;
    } else if (width > 800 && this.GlobalBehaviorService.SelectedView !== View.None) {
      this.GlobalBehaviorService.SelectedView = View.None;
    }
  }

}
