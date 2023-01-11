import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {LoginService} from "../../services/login.service";
import {TokenStorageService} from "../../../../services";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  showPassword: boolean = false;
  emailError: string;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {
    this._createForm();
  }

  ngOnInit(): void {
  }

  _createForm(): void {     //ToDo Написати валідатори на всі форми
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    })
  }

  login() {
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: (value) => {
        this.tokenStorageService.setToken(value);
        this.router.navigate(['admin']);
      },
      error: e => this.emailError = e.error.message
    })
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
