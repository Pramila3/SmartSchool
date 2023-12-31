import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { throwError, map, catchError, of } from 'rxjs';
import { URI } from './restURI';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = `${environment.apiBaseUrl}`;
  token = "Bearer " + localStorage.getItem("Access-Token");
  constructor(private http: HttpClient, private router: Router,) { 
    console.log(this.token);
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  };

  postHttpService(data: any, method: any) {
    var url = this.baseUrl + URI[method as keyof typeof URI];
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.token,
      })
    };
    return this.http.post<any>(url, data, httpOptions).pipe(map(data => {
      return data;
    }), catchError(this.handleError));
  }
  

  getHttpServiceWithId(data: any, method: any, key: any) {
    console.log(key);

    var url = this.baseUrl + URI[method as keyof typeof URI] + '?' + key + '=' + data;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': this.token,
      })
    };
    return this.http.get<any>(url, httpOptions).pipe(map(data => {
      return data;
    }), catchError(this.handleError));
  }

  getHttpServiceWithDynamicParams(data: any, method: any) {
    var url = this.baseUrl + URI[method as keyof typeof URI];
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': this.token,
      }),
      params: data
    };
    return this.http.get<any>(url, httpOptions).pipe(map(data => {
      return data;
    }), catchError(this.handleError));
  }
  putHttpService(data: any, method: any) {
    var url = this.baseUrl + URI[method as keyof typeof URI];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token,
      })
    };
    return this.http.put<any>(url, data, httpOptions).pipe(map(data => {
      // console.log(data); 
      return data;
    }), catchError(this.handleError));
  }

  getHttpService(method: any) {
    var url = this.baseUrl + URI[method as keyof typeof URI];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2Uuc2hjQGdtYWlsLmNvbSIsImV4cCI6MTY5NDUyNDgyM30.Q_XzVGFcbKq0LXoTk7Odl5OKjabQEEUgObSTZT_wX7ve29i2Ekdr1KTFyYntBNErkRIvf09Y0r_xSx8JLH--UA',
        // 'Authorization': ' ' + this.authService.getBarierToken(),
      })
    };
    return this.http.get<any>(url, httpOptions).pipe(map(data => {
      return data;
    }), catchError(this.handleError));
  }

  deleteHttpService(data: any, method: any) {
    var url = this.baseUrl + URI[method as keyof typeof URI];
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': this.token,
      }),
      params: data
    };
    return this.http.delete<any>(url, httpOptions).pipe(map(data => {
      return data;
    }), catchError(this.handleError));
  }
}
