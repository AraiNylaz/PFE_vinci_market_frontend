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
  styleUrls: ['./deleteProfil.component.css'],
})
export class DeleteProfilComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  get currentUser() {
    return this.authenticationService.currentUser;
  }

  backToHomePage() {
    this.router.navigate(['/']);
  }

  async onDelete() {
    await this.authenticationService.deleteProfil();
    await this.authenticationService.logout();
    this.backToHomePage();
  }
}
