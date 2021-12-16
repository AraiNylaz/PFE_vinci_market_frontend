import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { UserService } from 'src/app/services/user.service';

import { AuthenticationService } from '../../services/authentication.service';
import { Annonce } from '../models/annonce';
import { User } from '../models/user';

@Component({
  templateUrl: 'annonces.component.html',
  styleUrls: ['annonces.component.css'],
})
export class AnnoncesComponent {
  annonces: Annonce[] = [];
  map = new Map();

  constructor(
    private annonceService: AnnonceService,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
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
    this.annonceService.getAll().subscribe((annonce) => {
      this.annonces = annonce;
      this.annonces.forEach((annonce) => {
        this.userService.getUser(annonce.seller?.mail!).subscribe((user) => {
          this.map.set(annonce, user);
        });
      });
    });
  }
}
