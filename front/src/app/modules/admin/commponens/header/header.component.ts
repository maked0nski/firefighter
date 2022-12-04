import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../../../services";
import {DataService} from "../../../../services";
import {IUser} from "../../intesface";
import {UserProfileService} from "../../service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData :IUser | undefined
  // image:any

  constructor(
    private authService: AuthService,
    private usersService:UserProfileService,
    private dataService: DataService,

  ) { }

  ngOnInit(): void {
    this.dataService.userStorage.subscribe(value => {
      this.userData = value
      // this.image = this.usersService.getAvatar(value?.image)
    })
  }

  logout() {
    this.authService.logout()
  }
}
