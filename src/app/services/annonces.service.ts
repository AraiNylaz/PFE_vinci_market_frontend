import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Annonce } from '../components/models/annonce';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../components/models/subCategory';

let baseUrl = environment.api+'/products/';
let urlSubCategory = environment.api+'/subcategory/';
@Injectable({ providedIn: 'root' })
export class AnnonceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Annonce[]> {
    return this.http
      .get<Annonce[]>(baseUrl)
      .pipe(map((res) => plainToClass(Annonce, res)));
  }

  getSubCategories(): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(urlSubCategory).pipe(map((res)=>plainToClass(SubCategory,res)));
  }
}
