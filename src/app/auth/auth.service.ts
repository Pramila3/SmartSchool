import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { URI } from '../pages/services/restURI';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthService {
  baseUrl = `${environment.apiBaseUrl}`;
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private http: HttpClient, private router: Router,
  ) {
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

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('Access-Token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('Access-Token') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this.http.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this.http.post('api/auth/reset-password', password);
  }



  postHttpServicesighIn(data: any, method: any) {
    //console.log('request data', data); 
    var url = this.baseUrl + URI[method as keyof typeof URI];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(url, data, httpOptions).pipe(map(data => {
      if (data.status) {
        this._authenticated = true;
        localStorage.setItem("Access-Token", data.resultData.objUserDetail.token);
        localStorage.setItem("schoolcode", data.resultData.objUserDetail.username);
        localStorage.setItem("username", data.resultData.objUserDetail.username);
        localStorage.setItem('academicYear', new Date().getFullYear().toString());
      }
      return data;
    }), catchError(this.handleError));
  }









  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    return this.http.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
//   check(){
//     let token = localStorage.getItem('Access-Token');
//     // Check if the user is logged in
//     if (token) {
//       this._authenticated = true
//       return of(true);
//     }

//     // Check the access token availability
//     if (!token) {
//       this._authenticated = false
//       // Swal.fire({
//       //   text: this.logoutmessage ,
//       //   icon: 'info',
//       //   title: this.messageTitle,
//       // });
//       return of(false);
//     }


//   }


  signOut() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('Access-Token');
    this._authenticated = false;
    localStorage.clear();
  }





}
