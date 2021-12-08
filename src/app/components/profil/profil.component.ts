import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';

import { AuthenticationService } from '../../services/authentication.service';
import { Annonce } from '../models/annonce';
import { User } from '../models/user';

@Component({
  templateUrl: 'profil.component.html',
  styleUrls: ['profil.component.css'],
})
export class ProfilComponent {
  constructor(private authenticationService: AuthenticationService) {}

  get currentUser() {
    return this.authenticationService.currentUser;
  }
}
