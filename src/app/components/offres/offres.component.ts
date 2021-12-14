import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from 'src/app/services/offres.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Offre } from '../models/offres';

@Component({
  selector: 'app-offres',
  templateUrl: 'offres.component.html',
  styleUrls: ['offres.component.css'],
})
export class OffresComponent {
  offres: Offre[] = [];
  constructor(
    private offreService: OffreService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      offreService.getAll(params['id']).subscribe((offres) => {
        this.offres = offres;
      });
    });
  }
}
