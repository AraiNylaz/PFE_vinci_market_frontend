import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from 'src/app/services/offres.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Offre } from '../models/offres';
import { User } from '../models/user';

@Component({
  selector: 'app-offres',
  templateUrl: 'offres.component.html',
  styleUrls: ['offres.component.css'],
})
export class OffresComponent {
  offres: Offre[] = [];
  users: User[] = [];
  map = new Map();

  constructor(
    private offreService: OffreService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      offreService.getAll(params['id']).subscribe((offres) => {
        this.offres = offres;
        this.offres.forEach((offer) => {
          userService.getUser(offer.buyer?.mail!).subscribe((user) => {
            this.map.set(offer, user);
          });
        });
      });
    });
  }
}
