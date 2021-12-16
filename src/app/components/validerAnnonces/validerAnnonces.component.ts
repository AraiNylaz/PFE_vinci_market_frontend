import { Component } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonces.service';
import { UserService } from 'src/app/services/user.service';
import { Annonce } from '../models/annonce';

@Component({
  templateUrl: './validerAnnonces.component.html',
  styleUrls: ['validerAnnonces.component.css'],
})
export class ValiderAnnoncesComponent {
  annonces: Annonce[] = [];
  map = new Map();

  constructor(
    private annonceService: AnnonceService,
    private userService: UserService
  ) {
    this.chargement();
  }

  validate(annonce: Annonce) {
    this.annonceService.validate(annonce);
    window.location.reload();
  }

  chargement() {
    this.annonceService.getAllNotValidated().subscribe((annonce) => {
      this.annonces = annonce;
      this.annonces.forEach((annonce) => {
        this.userService.getUser(annonce.seller?.mail!).subscribe((user) => {
          this.map.set(annonce, user);
        });
      });
    });
  }
}
