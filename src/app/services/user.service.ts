import { User } from '../components/models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

let baseUrl = environment.api + '/users/';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(baseUrl)
      .pipe(map((res) => plainToClass(User, res)));
  }

  createUser(user: User) {
    console.log('user');
    console.log(user);
    return this.http
      .post<User>(baseUrl + 'test', user)
      .pipe(map((res) => plainToClass(User, res)));
  }

  banOrUnban(user: User) {
    return this.http.get<void>(baseUrl + 'user/' + user.idUser).subscribe();
  }
}
