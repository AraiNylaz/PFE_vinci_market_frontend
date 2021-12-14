import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Annonce } from '../models/annonce';

@Component({
  templateUrl: 'annonceDetail.component.html',
  styleUrls: ['annonceDetail.component.css'],
})
export class AnnoceDetailComponent {
  annonce!: Annonce;

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.route.params.subscribe((params) => {
      this.annonceService.getById(params['id']).subscribe((annonce) => {
        this.annonce = annonce;
      });
    });
  }

  get currentUser() {
    return this.authService.currentUser?.idUser;
  }

  seeOffers(id: string) {
    this.router.navigate(['/offres/' + id]);
  }

  addOffer(id: string) {
    this.router.navigate(['/ajouterOffre/' + id]);
  }
}
