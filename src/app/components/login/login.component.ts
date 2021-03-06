import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { plainToClass } from 'class-transformer';
import { User } from '../models/user';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public loginInvalid!: boolean;
  private formSubmitAttempt!: boolean;
  private returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });

    if (await this.authService.currentUser) {
      await this.router.navigate([this.returnUrl]);
    }
  }
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const email = this.f['email'].value;
        const password = this.f['password'].value;
        await this.authService.login(email, password).subscribe((user) => {
          if (user != null) {
            user = plainToClass(User, user);
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.authService.currentUser = user;
            this.router.navigate([this.returnUrl]);
          } else {
            this.loginInvalid = true;
          }
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
