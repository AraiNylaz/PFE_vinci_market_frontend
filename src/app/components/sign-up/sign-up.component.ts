import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  public signUpInvalide!: boolean;
  private formSubmitAttempt!: boolean;
  private returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  async ngOnInit() {
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phone:['',Validators.required],
      commune:['',Validators.required]

    });

    // if (await this.authService.currentUser) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.signUpInvalide = false;
    this.formSubmitAttempt = false;
    this.f
    if (this.form.valid) {
      try {
        const email = this.f['email'].value;
        const password = this.f['password'].value;
        const firstName= this.f['firstName'].value;
        const lastName=this.f['lastName'].value;
        const phone=this.f['phone'].value;
        const commune=this.f['commune'].value;
        await this.authService.signup(password,email,firstName,lastName,phone);
      } catch (err) {
        this.signUpInvalide = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
