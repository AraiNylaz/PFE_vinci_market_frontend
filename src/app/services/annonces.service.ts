import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annonce } from '../components/models/annonce';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../components/models/subCategory';
import { Category } from '../components/models/category';
import { User } from '../components/models/user';

let baseUrl = environment.api + '/products/';
let urlSubCategory = environment.api + '/subcategory/';
let urlCategory = environment.api + '/category/';
@Injectable({ providedIn: 'root' })
export class AnnonceService {
  constructor(private http: HttpClient) {}

  getById(id: string) {
    return this.http
      .get<Annonce>(baseUrl + id)
      .pipe(map((res) => plainToClass(Annonce, res)));
  }

  getAll(): Observable<Annonce[]> {
    return this.http
      .get<Annonce[]>(baseUrl)
      .pipe(map((res) => plainToClass(Annonce, res)));
  }

  getSubCategories(): Observable<SubCategory[]> {
    return this.http
      .get<SubCategory[]>(urlSubCategory)
      .pipe(map((res) => plainToClass(SubCategory, res)));
  }
  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(urlCategory)
      .pipe(map((res) => plainToClass(Category, res)));
  }
  addAnnonce(
    title: String,
    description: String,
    place: String,
    idSubCategory: String,
    idSeller: string | undefined,
    price: number,
    status: string,
    photo:string,
  ) {
    return this.http
      .post<Annonce>(`${baseUrl}`, {
        title: title,
        description: description,
        place: place,
        idSubCategory: idSubCategory,
        idSeller: idSeller,
        price: price,
        status: status,
      })
      .pipe(map((res)=>plainToClass(Annonce,res)));
      
  }
  // addAnnonce(annonce:Annonce):void{
  //   console.log("passe dans add Annonce");
  //   this.http.post<Annonce>(`${baseUrl}`,{
  //     "product":annonce
  //   }).subscribe(()=>console.log("enregistrement terminer"),(err)=>console.log(err));

  // }
  getAllNotValidated(): Observable<Annonce[]> {
    return this.http
      .get<Annonce[]>(baseUrl + 'notValidated')
      .pipe(map((res) => plainToClass(Annonce, res)));
  }

  validate(annonce: Annonce) {
    return this.http
      .get<void>(baseUrl + 'validate/' + annonce.idProduct)
      .subscribe();
  }

  createAnnonce(annonce: Annonce) {
    return this.http
      .post<Annonce>(baseUrl, annonce)
      .pipe(map((res) => plainToClass(Annonce, res)));
  }
}
// signup(
//     password: string,
//     mail: string,
//     firstName: string,
//     lastName: string,
//     phone:string,
//     campus:String,
//   ): void {
//     console.log("ok");
//     this.http
//       .post<User>(`${this.baseUrl}`, {
//         "lastName": lastName,
//         "firstName": firstName,
//         "password": password,
//         "campus":campus,
//         "phone":phone,
//         "mail": mail,
//         "isAdmin":false,
//       }).subscribe(()=>{
//         console.log('Enregistrement terminé !');
//       },(error) => {
//         console.log('Erreur ! : ' + error);
//       });
//   }
