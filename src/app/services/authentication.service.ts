import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/models/user';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

let baseUrl = environment.api + '/users/';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // l'utilisateur couramment connecté (undefined sinon)
  public currentUser?: User;

  constructor(private http: HttpClient) {
    // au départ on récupère un éventuel utilisateur stocké dans le sessionStorage
    let data = sessionStorage.getItem('currentUser');
    if (data) data = JSON.parse(data);
    this.currentUser = plainToClass(User, data);
  }

  currentUserValue() {
    return this.currentUser;
  }

  login(email: string, password: string): Observable<User> {
    // return this.http
    //   .post<any>(`${this.baseUrl}/login`, { email, password })
    //   .pipe(
    //     map((user) => {
    //       user = plainToClass(User, user);
    //       // login successful if there's a jwt token in the response
    //       if (user && user.token) {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         sessionStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUser = user;
    //       }
    //       return user;
    //     })
    //   );
    return this.http.post<User>(`${baseUrl}login`, {
      mail: email,
      password: password,
    });
  }

  emailExisting(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}api/users/unknownEmail/${email}`);
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
    phone: string,
    campus: String
  ): Observable<User> {
    return this.http.post<User>(`${baseUrl}`, {
      lastName: lastName,
      firstName: firstName,
      password: password,
      campus: campus,
      campusName: '',
      phone: phone,
      mail: mail,
      isAdmin: false,
    });
  }

  updateProfil(
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    campus: String
  ): void {
    console.log('ok');
    this.http
      .put<User>(`${baseUrl}` + `${this.currentUser?.idUser}`, {
        lastName: lastName,
        firstName: firstName,
        password: password,
        campus: campus,
        phone: phone,
        isAdmin: false,
      })
      .subscribe(
        (user) => {
          user = plainToClass(User, user);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user;
          console.log('userUpdate : ' + user);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  deleteProfil(): void {
    console.log('ok');
    this.http
      .get<User>(`${baseUrl}` + 'delete/' + `${this.currentUser?.idUser}`, {})
      .subscribe(() => {
        this.logout();
      });
  }
}
