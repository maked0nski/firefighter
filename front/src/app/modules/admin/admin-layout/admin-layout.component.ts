import {Component,  OnInit} from '@angular/core';
import {IUser} from "../intesface";
import {DataService, TokenStorageService} from "../../../services";
import {UsersService} from "../service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  userData: IUser

  constructor(
    private tokenStorageService: TokenStorageService,
    private dataService: DataService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(value => {
      this.userData = value['user']
      this.dataService.userStorage.next(value['user'])
    })
  }

  ngOnInit(): void {
  }

}
