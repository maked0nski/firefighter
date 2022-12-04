import { Component, OnInit } from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {RegisterService} from "../../services/register.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;
  showPassword: boolean = false;
  emailError: string;

  constructor(
    private registerService :RegisterService,
    private router:Router,
    // private tokenStorageService :TokenStorageService,
  ) { this._createForm(); }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.registerForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new UntypedFormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    }, [this._checkPasswords])
  }

  register(): void {
    const rawValue = this.registerForm.getRawValue();
    delete rawValue.confirmPassword;
    this.registerService.register(rawValue).subscribe({
      next:(value) => {
        this.router.navigate(['login'])
      },
      error:e => this.emailError = e.error.message
    })
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  _checkPasswords(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')
    const confirmPassword = form.get('confirmPassword')
    return password?.value === confirmPassword?.value ? null : {notSame: 'Passwords do not match'}
  }

}
