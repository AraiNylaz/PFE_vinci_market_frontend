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
import { UserService } from '../../services/user.service';
import { User } from '../models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  templateUrl: 'modifierProfil.component.html'
  //styleUrls: ['modifierProfil.component.css'],
})
export class ModifierProfilComponent {

  formModifier!: FormGroup;
  public signUpInvalide!: boolean;
  private formSubmitAttempt!: boolean;
  private returnUrl!: string;

  constructor (
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  get currentUser() {
    return this.authenticationService.currentUser;
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.formModifier = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phone:['',Validators.required],
      campus:['',Validators.required]

    });

     if (await this.authenticationService.currentUser) {
      await this.router.navigate([this.returnUrl]);
     }
  }

  get f() {
    return this.formModifier.controls;
  }

  async onSubmit() {
    this.signUpInvalide = false;
    this.formSubmitAttempt = false;
    this.f
    if (this.formModifier.valid) {
      try {
        const email = this.f['email'].value;
        const password = this.f['password'].value;
        const firstName= this.f['firstName'].value;
        const lastName=this.f['lastName'].value;
        const phone=this.f['phone'].value;
        const campus=this.f['campus'].value;

        await this.authenticationService.signup(password,email,firstName,lastName,phone,campus);
      } catch (err) {
        this.signUpInvalide = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
