import { environment } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Email } from 'src/app/models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  sendEmail(email: Email){
    return this.httpClient.post(`${environment.apiUrl}/send/email`, email).pipe(
        catchError(error => {
          return throwError(error);
        })
      )
  }
}
