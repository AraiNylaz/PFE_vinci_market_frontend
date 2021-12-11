import { Component } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonces.service';
import { Annonce } from '../models/annonce';

@Component({
  templateUrl: './validerAnnonces.component.html',
})
export class ValiderAnnoncesComponent {
  annonces: Annonce[] = [];

  constructor(private annonceService: AnnonceService) {
    annonceService.getAllNotValidated().subscribe((annonce) => {
      this.annonces = annonce;
    });
  }

  validate(annonce: Annonce) {}
}
