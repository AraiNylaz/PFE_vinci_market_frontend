import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { AnnonceService } from 'src/app/services/annonces.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Fileservice } from 'src/app/services/file.service';
import { Annonce } from '../models/annonce';
import { Picture } from '../models/picture';
import { Campus, User } from '../models/user';
import { Video } from '../models/video';

@Component({
  templateUrl: 'annonceDetail.component.html',
  styleUrls: ['annonceDetail.component.css'],
})
export class AnnonceDetailComponent {
  annonce!: Annonce;
  pictures:Picture[]=[];
  video!:Video;
  blobSasUrl !:string;
  blobServiceClient!:BlobServiceClient;
  containerName !:string;
  containerClient !:ContainerClient;
  selecetdFile !: File;
  imagename!:string | ArrayBuffer | null;
  user!:User |undefined;
  address!: string;
  
  
  constructor(
    private annonceService: AnnonceService,
    private fileservice:Fileservice,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
    ) {
      this.route.params.subscribe(async (params) => {
        console.log(params);
        this.annonceService.getById(params['id']).subscribe(async (annonce) => {
          this.annonce = annonce;
          console.log(annonce);
          
          if(this.annonce.seller?.campus ==  Campus.WOLUWE.toLocaleUpperCase()){
            this.address =  "avenue de la semoy 5 1200 belgique";
          }
          if(this.annonce.seller?.campus == Campus.LOUVAINLANEUVE.toLocaleUpperCase()){
            this.address =  "Chem. de la Bardane 17, 1348 Ottignies-Louvain-la-Neuve belgique";
          }
          if(this.annonce.seller?.campus == Campus.IXELLES.toLocaleUpperCase()){
            this.address =  "Rue d'Arlon 11, 1050 Ixelles";
          }
          
        });

        this.fileservice.getPicture(params['id']).subscribe((picture)=>{
          this.pictures=picture;
          console.log(picture);
          console.log("herrrrrre");
          
        });
        
        this.fileservice.getVideo(params['id']).subscribe((videos)=>{
          this.video=videos;
        });
      });
        
        
        
      
      const token ='sp=racwdli&st=2021-12-16T17:54:57Z&se=2021-12-18T01:54:57Z&sv=2020-08-04&sr=c&sig=WqHP8UGA00Ei8tM09HQwmLUsTOCOwTaad4uYwfQWQ%2Fc%3D';
      
      this.blobSasUrl=`https://merlinduvivier.blob.core.windows.net?${token}`;
      this.blobServiceClient=new BlobServiceClient(this.blobSasUrl);
      this.containerName="test";
      this.containerClient=this.blobServiceClient.getContainerClient(this.containerName);
      this.user=this.authService.currentUser;
      
    }
    
    get currentUser() {
      return this.authService.currentUser?.idUser;
    }
    
    seeOffers(id: string) {
      this.router.navigate(['/offres/' + id]);
    }
    
    addOffer(id: string) {
      this.router.navigate(['/ajouterOffre/' + id]);
    }
    
    valider(annonce:Annonce){
      this.annonceService.validate(annonce);
      this.router.navigate(["/annonces"]);
    }
    async delete(id:string | undefined){
      await this.annonceService.deleteById(id);
      this.router.navigate(["/"]);
      
    }

    async onFileUpload(event: any){
      this.selecetdFile=event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selecetdFile);
      reader.onload = () => {
        this.imagename=reader.result;
      };
      const nomFichier = Math.floor((Math.random()+1)*100)+""+this.selecetdFile.name;
      try {
        const promises = [];
        
        
        
        const blockBlobClient = this.containerClient.getBlockBlobClient(nomFichier);
        promises.push(blockBlobClient.uploadBrowserData(this.selecetdFile));
        await Promise.all(promises);
        await this.fileservice.addFile(this.annonce.idProduct,nomFichier);
        
        alert('Done.');
      }
      catch (error) {
        alert(error);
      }
      window.location.reload();
      
    }

  }
  