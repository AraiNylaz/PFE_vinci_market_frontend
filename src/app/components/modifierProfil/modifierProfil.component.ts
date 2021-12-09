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
import { throwError } from 'rxjs';
//import { ConfirmedValidator } from './confirm.validator';

@Component({
  templateUrl: './modifierProfil.component.html',
  styleUrls: ['./modifierProfil.component.css']
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
    
    backToHomePage(){
      this.router.navigate(['/profil']);
    }
    
    async ngOnInit() {
      
      this.formModifier = this.fb.group({
        email: [this.currentUser?.mail, Validators.email],
        password: ['', Validators.required],
        passwordVerify: ['', Validators.required],
        firstName:[this.currentUser?.firstName,Validators.required],
        lastName:[this.currentUser?.lastName,Validators.required],
        phone:[this.currentUser?.phone,Validators.required],
        campus:[this.currentUser?.campus,Validators.required]
        
      })
      console.log(this.formModifier);
 
    }
    
    get f() {
      return this.formModifier.controls;
    }
    
    password(formGroup: FormGroup) {
      this.f
      const password = formGroup.get('password');
      const passwordVerify = formGroup.get('passwordVerify');
      return password === passwordVerify ? null : { passwordNotMatch: true };
    }
    
    async onSubmit() {
      this.signUpInvalide = false;
      this.formSubmitAttempt = false;
      this.f
      if (this.formModifier.valid) {
        try {
          const email = this.f['email'].value;
          console.log(email);
          const password = this.f['password'].value;
          console.log(password);
          const passwordVerify = this.f ['passwordVerify'].value;
          console.log(passwordVerify);
          const firstName= this.f['firstName'].value;
          console.log(firstName);
          const lastName=this.f['lastName'].value;
          console.log(lastName);
          const phone=this.f['phone'].value;
          console.log(phone);
          const campus=this.f['campus'].value;
          console.log(campus);
          password(this.formModifier);
          await this.authenticationService.updateProfil(password,email,firstName,lastName,phone,campus);
        } catch (err) {
          this.signUpInvalide = true;
        }
      } else {
        this.formSubmitAttempt = true;
      }
    }
    
  }
  