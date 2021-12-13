import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonces.service';
import { SubCategory } from '../models/subCategory';
import { AuthenticationService } from '../../services/authentication.service';
import { Category } from '../models/category';
import { Annonce } from '../models/annonce';
import { ThisReceiver } from '@angular/compiler';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
@Component({
  templateUrl: 'ajouter_annonce.component.html',
  styleUrls: ['ajouter_annouce.component.css'],
})
//https://merlinduvivier.blob.core.windows.net/test?sp=racwl&st=2021-12-13T14:12:58Z&se=2021-12-13T22:12:58Z&spr=https&sv=2020-08-04&sr=c&sig=rrXejLn9nm75U7kGV1gHjvXzN36fx47x70A4RgbCXns%3D
export class AjouterAnnonceComponent {
  form!: FormGroup;
  subCategories: SubCategory[] = [];
  subCategory!:SubCategory;
  categories:Category[] = [];
  category!:Category;
  annouce !: Annonce;
  datePipe: DatePipe = new DatePipe('en-EU');
  selecetdFile !: File;
  image!:string | ArrayBuffer | null;
  blobSasUrl !:string;
  blobServiceClient!:BlobServiceClient;
  containerName !:string;
  containerClient !:ContainerClient;
  private returnUrl!: string;

  constructor(private fb: FormBuilder , private route: ActivatedRoute,private annonceService: AnnonceService, private router: Router,
    private authService: AuthenticationService) {
    annonceService.getSubCategories().subscribe((subCategories)=>{
      this.subCategories=subCategories;

    });
    this.subCategory=this.subCategories[0];
    annonceService.getCategories().subscribe((categories)=>{
      this.categories=categories;
    })
    this.blobSasUrl='https://merlinduvivier.blob.core.windows.net/test?sp=racwl&st=2021-12-13T14:12:58Z&se=2021-12-13T22:12:58Z&spr=https&sv=2020-08-04&sr=c&sig=rrXejLn9nm75U7kGV1gHjvXzN36fx47x70A4RgbCXns%3D';
    this.blobServiceClient=new BlobServiceClient(this.blobSasUrl);
    this.containerName="test";
    this.containerClient=this.blobServiceClient.getContainerClient(this.containerName);

  }
  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      place:['',Validators.required],
      subcategory:['',Validators.required],
      price:[0,!Validators.required],
      image:['',!Validators.required],


    });
    if (!await this.authService.currentUser) {
      await this.router.navigate([this.returnUrl]);
    }

     
  }


  get f() {
    return this.form.controls;
  }
  async onFileUpload(event: any){
    this.selecetdFile=event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selecetdFile);
    reader.onload = () => {
      this.image=reader.result;
    };
    }

  async onSubmit() {
    this.f
    if (this.form.valid) {
      try {
        this.annouce=new Annonce();
        const title = this.f['title'].value;
        const description = this.f['description'].value;
        const place= this.f['place'].value;
        let subcategory=this.f['subcategory'].value;
        console.log(this.image);
        
        const idSubCategory=subcategory.idSubCategory;
        const seller=this.authService.currentUser;
        const idSeller=seller?.idUser;
        let status="SELL";
       
        var price =this.f['price'].value;
        
        if(price==null){
          price=0;
        }
        if(price==0){
          status="FREE";
        }
        try {
          const promises = [];
          
          const blockBlobClient = this.containerClient.getBlockBlobClient(this.selecetdFile.name);
          promises.push(blockBlobClient.uploadBrowserData(this.selecetdFile));

          
          await Promise.all(promises);
          alert('Done.');
        }
        catch (error) {
          alert(error);
        }


        await this.annonceService.addAnnonce(title,description,place,idSubCategory,idSeller,price,status);
        await this.router.navigate([this.returnUrl]);
        
        
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
