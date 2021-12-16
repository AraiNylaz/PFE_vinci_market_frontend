import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { UserService } from 'src/app/services/user.service';

import { AuthenticationService } from '../../services/authentication.service';
import { Annonce } from '../models/annonce';
import { User } from '../models/user';

@Component({
  templateUrl: 'mesAnnonces.component.html',
  styleUrls: ['mesAnnonces.component.css'],
})
export class MesAnnoncesComponent {
  annonces: Annonce[] = [];
  constructor(
    private annonceService: AnnonceService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.chargement();
  }

  get currentUser() {
    return this.authService.currentUser;
  }
  annonceDetails(id: string) {
    this.router.navigate([`/annonceDetail/${id}`]);
  }

  chargement() {
    this.annonceService
      .getMesAnnonces(this.currentUser?.idUser!)
      .subscribe((annonce) => {
        this.annonces = annonce;
      });
  }
}
