import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { SubCategory } from '../models/subCategory';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  templateUrl: 'ajouter_annonce.component.html',
  styleUrls: ['ajouter_annouce.component.css'],
})
export class AjouterAnnonceComponent {
  form!: FormGroup;
  subCategories: SubCategory[] = [];
  subCategory!:SubCategory;
  datePipe: DatePipe = new DatePipe('en-EU');
  private returnUrl!: string;

  constructor(private fb: FormBuilder , private route: ActivatedRoute,private annonceService: AnnonceService, private router: Router,
    private authService: AuthenticationService) {
    annonceService.getSubCategories().subscribe((subCategories)=>{
      this.subCategories=subCategories;

    });
    this.subCategory=this.subCategories[0];
    

  }
  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      place:['',Validators.required],
      subcategory:['',Validators.required],
      price:[0,!Validators.required],


    });
    if (!await this.authService.currentUser) {
      await this.router.navigate([this.returnUrl]);
    }

     
  }


  get f() {
    return this.form.controls;
    //va chercher la properties du form
  }
   

  async onSubmit() {
    this.f
    if (this.form.valid) {
      try {
        const title = this.f['title'].value;
        const description = this.f['description'].value;
        const place= this.f['place'].value;
        const subcategory=this.f['subcategory'].value;
        const idSubCategory=subcategory.idSubCategory;
        
        var  date =new Date();
        const seller=this.authService.currentUser;
        const idSeller=seller?.idUser;
        const creationDate=Date.now();
        
        var price =this.f['price'].value;
        if(price==null){
          price=0;
        }
        console.log(idSeller);
        
        
      } catch (err) {
        console.log(err);
        
      }
    }else{
      console.log("false");
    } 
  }
  // getformattedDate(){
  //   var date!:number;
  //   date = Date.now();
  //   var transformDate = this.datePipe.transform(date, 'dd-MM-yyyy ');
  //   return transformDate;

  // }
  
}
