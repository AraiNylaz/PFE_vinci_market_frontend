import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { OffreService } from 'src/app/services/offres.service';
import { Annonce } from '../models/annonce';
import { Offre } from '../models/offres';

@Component({
  templateUrl: 'ajouterOffre.component.html',
  styleUrls: ['ajouterOffre.component.css'],
})
export class AjouterOffreComponent implements OnInit {
  form!: FormGroup;
  public offerInvalid!: boolean;
  private formSubmitAttempt!: boolean;
  offer = new Offre();
  annonce!: Annonce;

  constructor(
    private offerService: OffreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.offer.idProduct = params['id'];
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      value: [0, Validators.required],
      message: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.offerInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.offer.idBuyer = this.offerService.currentUser;
        this.offer.value = this.f['value'].value;
        this.offer.message = this.f['message'].value;
        await this.offerService.createOffer(this.offer);
        await this.router.navigate(['/']);
      } catch (err) {
        this.offerInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
