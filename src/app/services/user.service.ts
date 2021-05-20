import { Login } from './../models/login.model';
import { Register } from './../models/register.model';

import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/login`, login).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  register(register: Register): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/signup`, register).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

}
