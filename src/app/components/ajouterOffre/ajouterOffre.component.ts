import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { OffreService } from 'src/app/services/offres.service';
import { Annonce } from '../models/annonce';
import { Offre } from '../models/offres';

@Component({
  templateUrl: 'ajouterOffre.component.html',
})
export class AjouterOffreComponent implements OnInit {
  annonce!: Annonce;
  form!: FormGroup;
  public offerInvalid!: boolean;
  private formSubmitAttempt!: boolean;
  offer!: Offre;

  constructor(
    private offerService: OffreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.annonce.idProduct = params['id'];
    });

    this.form = this.fb.group({
      value: ['', Validators.email],
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
        this.offer.iProduct = this.annonce.idProduct;
        await this.offerService.createOffer(this.offer);
      } catch (err) {
        this.offerInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
      await this.router.navigate(['/']);
    }
  }
}
