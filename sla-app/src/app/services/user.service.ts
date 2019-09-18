import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<User>;

  constructor(private http: HttpClient) { }

  getUserData(): Observable<User> {
    let url = environment.BASE_URL + "User/GetUserData";
    return this.http.get<User>(url, { responseType: 'json' });
  }
}
