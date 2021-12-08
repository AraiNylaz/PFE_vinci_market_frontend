import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';

@Component({
  templateUrl: 'ajouter_annonce.component.html',
  styleUrls: ['annonces.component.css'],
})
export class AjouterAnnonceComponent {
  constructor(private annonceService: AnnonceService) {}
}
