import { Component, OnInit } from '@angular/core';
import { GlobalBehaviorService } from '../services/global-behavior.service';
import { Menu } from '../enums/Menu';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public Menu = Menu;
  constructor(public GlobalBehavourService: GlobalBehaviorService) { }

  ngOnInit(): void {
  }

}
