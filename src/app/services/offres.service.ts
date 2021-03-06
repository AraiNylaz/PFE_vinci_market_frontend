import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offre } from '../components/models/offres';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

let baseUrl = environment.api + '/offers/';
@Injectable({ providedIn: 'root' })
export class OffreService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAll(idProduct: string) {
    return this.http
      .get<Offre[]>(baseUrl + 'all/product/' + idProduct)
      .pipe(map((res) => plainToClass(Offre, res)));
  }

  get currentUser() {
    return this.authenticationService.currentUser?.idUser;
  }

  createOffer(offer: Offre) {
    return this.http
      .post<Offre>(baseUrl, offer)
      .subscribe((res) => plainToClass(Offre, res));
  }
}
