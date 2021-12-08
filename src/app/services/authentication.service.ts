import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { User } from '../components/models/user';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // l'utilisateur couramment connecté (undefined sinon)
  public currentUser?: User;
  private baseUrl = 'api/users';

  constructor(private http: HttpClient) {
    // au départ on récupère un éventuel utilisateur stocké dans le sessionStorage
    let data = sessionStorage.getItem('currentUser');
    if (data) data = JSON.parse(data);
    this.currentUser = plainToClass(User, data);
  }

  currentUserValue() {
    return this.currentUser;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map((user) => {
          user = plainToClass(User, user);
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
          }
          return user;
        })
      );
  }

  emailExisting(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}api/users/unknownEmail/${email}`
    );
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUser = undefined;
  }

  signup(
    password: string,
    mail: string,
    firstName: string,
    lastName: string,
    phone:string,
    campus:String,
  ): void {
    console.log("ok");
    this.http
      .post<User>(`${this.baseUrl}`, {
        "idUser":110,
        "lastName": lastName,
        "firstName": firstName,
        "password": password,
        "campus":campus,
        "phone":phone,
        "mail": mail,
        "isAdmin":false,
      }).subscribe(()=>{
        console.log('Enregistrement terminé !');
      },(error) => {
        console.log('Erreur ! : ' + error);
      });
      console.log("teste");
      
  }
}
