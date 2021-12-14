
  
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
import { Campus, User } from '../models/user';
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
  public campusEnum = Campus;
  
  constructor (
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private fb: FormBuilder,
    private route: ActivatedRoute
    
    ) {}
    
    get currentUser() {
      return this.authenticationService.currentUser;
    }
    
    backToProfilPage(){
      this.router.navigate(['/profil']);
    }
    
    async ngOnInit() {
      
      this.formModifier = this.fb.group({
        idUser: [this.currentUser?.idUser],
        email: [this.currentUser?.mail, Validators.email],
        password: [this.currentUser?.password, Validators.required],
        passwordVerify: [this.currentUser?.password, Validators.required],
        firstName:[this.currentUser?.firstName,Validators.required],
        lastName:[this.currentUser?.lastName,Validators.required],
        phone:[this.currentUser?.phone,Validators.required],
        campus:[this.currentUser?.campus,Validators.required]        
      })
      console.log("password check 1 :  "+ this.password(this.formModifier));
      console.log(this.formModifier);     
    }
    
    get f() {
      return this.formModifier.controls;
    }
    
    password(formGroup: FormGroup) {
      this.f
      const password = formGroup.get('password')?.value;
      const passwordVerify = formGroup.get('passwordVerify')?.value;
      return password === passwordVerify;
    }
    
    async onUpdate() {
      this.signUpInvalide = false;
      this.formSubmitAttempt = false;
      this.f
      if(this.password(this.formModifier) && this.formModifier.valid){
        console.log("1  :: ");
        try {
          console.log("2  :: ");
          const email = this.f['email'].value;
          const password = this.f['password'].value;
          const passwordVerify = this.f ['passwordVerify'].value;
          const firstName= this.f['firstName'].value;
          const lastName=this.f['lastName'].value;
          const phone=this.f['phone'].value;
          const campus=this.f['campus'].value;
          console.log("password check 3 :  "+ this.password(this.formModifier));
          if(this.password(this.formModifier)){
            console.log("password est true...")
            console.log(this.currentUser);
            await this.authenticationService.updateProfil(password,email,firstName,lastName,phone,campus);
            this.backToProfilPage();
          }else{
          console.log('error is intercept');
          }
          
        } catch (err) {
          this.signUpInvalide = true;
        }
      } else {
        this.formSubmitAttempt = true;
      }
    }
    
  }