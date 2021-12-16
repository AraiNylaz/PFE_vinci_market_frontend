import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { UserService } from 'src/app/services/user.service';

import { AuthenticationService } from '../../services/authentication.service';
import { Annonce } from '../models/annonce';
import { Category } from '../models/category';
import { SubCategory } from '../models/subCategory';
import { User } from '../models/user';

@Component({
  templateUrl: 'annonces.component.html',
  styleUrls: ['annonces.component.css'],
})
export class AnnoncesComponent implements OnInit {
  form!:FormGroup;
  annonces: Annonce[] = [];

  map = new Map();
  categories:Category[]=[];
  subCategories:SubCategory[] = [];

  constructor(
    private fb : FormBuilder,
    private annonceService: AnnonceService,
    private router: Router,
    private authService: AuthenticationService,
    private userService:UserService,
  ) {
    if(this.currentUser?.admin==true){
      annonceService.getAll().subscribe((annonces) => {
        this.annonces = annonces;
      });
    }else{
       annonceService.getAllToSell().subscribe((annonces) => {
      this.annonces = annonces;
    });
    }
    this.annonceService.getCategories().subscribe((categories)=>{
      this.categories=categories;
    })
    this.annonceService.getSubCategories().subscribe((subcategories)=>{
      this.subCategories=subcategories;
    })
    
   
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      prixMin:[-1,!Validators.required],
      prixMax:[-1,!Validators.required],
      //etat:["visible",!Validators.required],
      subCategory:["",!Validators.required],
    })
  }
  get f(){
    return this.form.controls;
  }
  onSubmit(){
    if(this.form.valid){
      try{
        const prixMin=this.f["prixMin"].value;
        const prixMax=this.f["prixMax"].value;
        const subCategory=this.f["subCategory"].value;
        this.annonceService.getFilterToSell(prixMin,prixMax,subCategory).subscribe((annonce)=>{
          this.annonces=annonce;
        });




      }catch (err){


      }
    }
  }
  

  get currentUser() {
    return this.authService.currentUser;
  }
  annonceDetails(id: string) {
    this.router.navigate([`/annonceDetail/${id}`]);
  }


  chargement() {
    this.annonceService.getAllToSell().subscribe((annonce) => {
      this.annonces = annonce;
      this.annonces.forEach((annonce) => {
        this.userService.getUser(annonce.seller?.mail!).subscribe((user) => {
          this.map.set(annonce, user);
        });
      });
    });
  }

}
