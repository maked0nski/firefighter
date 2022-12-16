import {Component, OnInit} from '@angular/core';

import {MenuItems} from "../../shared/menu-items/menu-items";
import {IUser} from "../../intesface";
import {AuthService, DataService} from "../../../../services";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userData: IUser | undefined

  constructor(
    public menuItems: MenuItems,
    private dataService: DataService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.userStorage.subscribe(value => {
      this.userData = value;
    })
  }

  logout() {
    this.authService.logout()
  }
}
