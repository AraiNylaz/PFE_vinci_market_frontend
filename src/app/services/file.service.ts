import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/models/user';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Picture } from '../components/models/picture';
import { Video } from '../components/models/video';

let pictureUrl =environment.api + '/pictures/';
let videoUrl = environment.api+'/videos/';

@Injectable({providedIn :"root"})
export class Fileservice{
    
    constructor(private http: HttpClient) {}
    
    addFile(idProduct:string | undefined,
        nameFile:string){
            if(this.isImage(nameFile)){
                    this.http.post<String>(`${pictureUrl}`,{
                    idProduct:idProduct,
                    namePicture:nameFile,
                }).subscribe(() => {
                    console.log('Enregistrement terminé !');
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                });
            }
            if(this.isVideo(nameFile)){
                this.http.post<String>(`${videoUrl}`,{
                    idProduct:idProduct,
                    nameVideo:nameFile,
                }).subscribe(() => {
                    console.log('Enregistrement terminé !');
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                });

            }
            

        }
    getPicture(idProduct:string | undefined):Observable<Picture[]>{
        return this.http.get<Picture[]>(pictureUrl+""+idProduct).pipe(map((res) => plainToClass(Picture, res)));
    }
    getVideo(idProduct:string|undefined):Observable<Video>{
        return this.http.get<Video>(videoUrl+""+idProduct).pipe(map((res)=>plainToClass(Video,res)));
    }
    getExtension(filename:string) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
      }
      
       isImage(filename:string) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
          case 'jpg':
          case 'gif':
          case 'bmp':
          case 'png':
            //etc
            return true;
        }
        return false;
      }
      
       isVideo(filename:string) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
          case 'm4v':
          case 'avi':
          case 'mpg':
          case 'mp4':
            // etc
            return true;
        }
        return false;
      }
}