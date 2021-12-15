import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/models/user';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Picture } from '../components/models/picture';

let baseUrl =environment.api + '/pictures/';

@Injectable({providedIn :"root"})
export class Photoservice{
    
    constructor(private http: HttpClient) {}
    
    addPhoto(idProduct:string | undefined,
        namePicture:string){
            console.log("teseet");
            this.http.post<String>(`${baseUrl}`,{
                idProduct:idProduct,
                namePicture:namePicture,
            }
            ).subscribe(() => {
                console.log('Enregistrement terminé !');
              },
              (error) => {
                console.log('Erreur ! : ' + error);
              });

        }
    getPicture(idProduct:string | undefined):Observable<Picture[]>{
        return this.http.get<Picture[]>(baseUrl+""+idProduct).pipe(map((res) => plainToClass(Picture, res)));
    }
}