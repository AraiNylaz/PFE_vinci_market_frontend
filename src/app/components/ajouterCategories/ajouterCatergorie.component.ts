import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { OffreService } from 'src/app/services/offres.service';
import { Annonce } from '../models/annonce';
import { Category } from '../models/category';
import { Offre } from '../models/offres';

@Component({
  templateUrl: 'ajouterCategorie.component.html',
})
export class AjouterCategorieComponent implements OnInit {
  form!: FormGroup;
  formSub!: FormGroup;
  invalid!: boolean;
  categories: Category[] = [];

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private router: Router
  ) {
    annonceService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });

    this.formSub = this.fb2.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  get fsub() {
    return this.formSub.controls;
  }

  onSubmitSubCat() {
    this.invalid = false;
    if (this.formSub.valid) {
      console.log(this.fsub);

      const category = this.fsub['category'].value;
      const idCat = category.idCategory;
      const subName = this.fsub['name'].value;
      console.log(idCat, subName);

      this.annonceService
        .ajouterSubCategorie(subName, idCat)
        .subscribe((cat) => {
          if (cat == null) {
            this.invalid = true;
            return;
          } else this.router.navigate(['/']);
        });
    }
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
