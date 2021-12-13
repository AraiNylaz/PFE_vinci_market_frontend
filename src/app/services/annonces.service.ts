import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annonce } from '../components/models/annonce';
import { environment } from 'src/environments/environment';

let baseUrl = environment.api + '/products/';
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
