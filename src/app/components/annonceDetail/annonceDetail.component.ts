import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { AnnonceService } from 'src/app/services/annonces.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Fileservice } from 'src/app/services/file.service';
import { Annonce } from '../models/annonce';
import { Picture } from '../models/picture';
import { User } from '../models/user';
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


  constructor(
    private annonceService: AnnonceService,
    private fileservice:Fileservice,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.route.params.subscribe(async (params) => {
      await this.annonceService.getById(params['id']).subscribe(async (annonce) => {
        this.annonce = annonce;
        this.fileservice.getPicture(this.annonce.idProduct).subscribe((picture)=>{
          this.pictures=picture;
        })
        
        await this.fileservice.getVideo(this.annonce.idProduct).subscribe((videos=>{
          this.video=videos;
        }))
        
        
      });
    });
    const token ='sp=racwdl&st=2021-12-14T09:08:55Z&se=2021-12-18T17:08:55Z&sv=2020-08-04&sr=c&sig=iwxED4BIiSKcrJSxJnHJv7ywxTyKpxUPJlHzvK0NYkY%3D';

    this.blobSasUrl=`https://merlinduvivier.blob.core.windows.net?${token}`;
    this.blobServiceClient=new BlobServiceClient(this.blobSasUrl);
    this.containerName="test";
    this.containerClient=this.blobServiceClient.getContainerClient(this.containerName);
    
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
