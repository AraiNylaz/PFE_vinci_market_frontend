
  
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

@Component({
  templateUrl: './deleteProfil.component.html',
  styleUrls: ['./deleteProfil.component.css']
})
export class DeleteProfilComponent {
  
  formDelete!: FormGroup;
  public deleteInvalide!: boolean;
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
    
    backToHomePage(){
      this.router.navigate(['/']);
    }
    
    async ngOnInit() {
      this.formDelete = this.fb.group({
        password: [this.currentUser?.password, Validators.required],       
      }) 
    }
    
    get f() {
      return this.formDelete.controls;
    }
    
    
    async onDelete() {
      this.deleteInvalide = false;
      this.formSubmitAttempt = false;
      this.f
      if(this.formDelete.valid){

        try {
          const password = this.f['password'].value;
          if(this.currentUser?.password === password){
            console.log("password est true...")
            console.log(this.currentUser);
            await this.authenticationService.deleteProfil();
            await this.authenticationService.logout();
            this.backToHomePage();
          }else{
          console.log('error is intercepted');
          }
          
        } catch (err) {
          this.deleteInvalide = true;
        }
      } else {
        this.formSubmitAttempt = true;
      }
    }
    
  }