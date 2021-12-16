import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { OffreService } from 'src/app/services/offres.service';
import { Annonce } from '../models/annonce';
import { Offre } from '../models/offres';

@Component({
  templateUrl: 'ajouterCategorie.component.html',
})
export class AjouterCategorieComponent implements OnInit {
  form!: FormGroup;
  invalid!: boolean;

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.invalid = false;
    if (this.form.valid) {
      const catName = this.f['name'].value;
      this.annonceService.ajouterCategorie(catName).subscribe((cat) => {
        if (cat == null) {
          this.invalid = true;
          return;
        } else this.router.navigate(['/']);
      });
    }
  }
}
