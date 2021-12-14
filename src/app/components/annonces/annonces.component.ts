import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';

import { AuthenticationService } from '../../services/authentication.service';
import { Annonce } from '../models/annonce';
import { User } from '../models/user';

@Component({
  templateUrl: 'annonces.component.html',
  styleUrls: ['annonces.component.css'],
})
export class AnnoncesComponent {
  annonces: Annonce[] = [];

  constructor(
    private annonceService: AnnonceService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    annonceService.getAll().subscribe((annonces) => {
      this.annonces = annonces;
    });
  }

  get currentUser() {
    return this.authService.currentUser;
  }
  annonceDetails(id: string) {
    this.router.navigate([`/annonceDetail/${id}`]);
  }
}
