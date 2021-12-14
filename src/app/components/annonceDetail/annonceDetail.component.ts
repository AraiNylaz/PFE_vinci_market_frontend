import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { Annonce } from '../models/annonce';

@Component({
  templateUrl: 'annonceDetail.component.html',
  styleUrls: ['annonceDetail.component.css'],
})
export class AnnoceDetailComponent implements OnInit {
  annonce!: Annonce;

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.annonce.idProduct = params['id'];

      console.log(params);
    });

    this.annonceService
      .getById(this.annonce.idProduct || '')
      .subscribe((annonce) => {
        this.annonce = annonce;
      });
  }
}
