import {Component, OnInit} from '@angular/core';

import {MenuItems} from "../../shared/menu-items/menu-items";
import {IUser} from "../../intesface";
import {AuthService, DataService} from "../../../../services";
import {UserProfileService} from "../../service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userData: IUser | undefined
  // image: any;

  constructor(
    public menuItems: MenuItems,
    private dataService: DataService,
    private authService: AuthService,
    // private usersService: UserProfileService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.userStorage.subscribe(value => {
      this.userData = value;
      // this.image = this.usersService.getAvatar(value?.image)
      // console.log(this.image)
    })
  }

  logout() {
    this.authService.logout()
  }
}
