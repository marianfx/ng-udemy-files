import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface AuthLoginResponseData extends AuthResponseData {
  registered: boolean;
}

@Injectable()
export class AuthService {
  userSubject = new BehaviorSubject<User>(null); // behavioral subject also stores previous value
  toeTimer: any;


  constructor(private http: HttpClient, private router: Router) {

  }

  signup(email: string, pass: string): Observable<AuthResponseData> {
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCTDY2hbATWPxVTuYbzStsv5tKsvHLc4bA';
    return this.http.post<AuthResponseData>(url, {
      email: email,
      password: pass,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  login(email: string, pass: string): Observable<AuthLoginResponseData> {
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCTDY2hbATWPxVTuYbzStsv5tKsvHLc4bA';
    return this.http.post<AuthLoginResponseData>(url, {
      email: email,
      password: pass,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(this.handleAuth.bind(this)));
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData)
      return;

    let udataJson = JSON.parse(userData) as {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    };
    let user = new User(udataJson.email, udataJson.id, udataJson._token, new Date(udataJson._tokenExpirationDate));

    console.log(user);
    if (user.token) {
      const durationExpire = new Date(udataJson._tokenExpirationDate).getTime() - new Date().getTime();
      this.userSubject.next(user);
      this.autoLogout(durationExpire * 1000);
    }
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    if (this.toeTimer)
      clearTimeout(this.toeTimer);
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.toeTimer = setTimeout(this.logout.bind(this), expirationDuration);
  }

  private handleAuth(data: AuthLoginResponseData) {
    const expDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.localId, data.idToken, expDate);
    console.log(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+data.expiresIn * 1000);
    this.userSubject.next(user);
  }

  private handleError(error: HttpErrorResponse): ErrorObservable {
    let errorMsg = '';
    switch(error && error.error && error.error.error && error.error.error.message) {
      case 'EMAIL_EXISTS':
          errorMsg = 'E-mail already registered!';
        break;
      case 'EMAIL_NOT_FOUND':
          errorMsg = 'No users with this e-mail!';
        break;
      case 'INVALID_PASSWORD':
          errorMsg = 'Incorrect password!';
        break;
      default:
          errorMsg = 'Unknown error: ' + error.message;
        break;
    }
    return ErrorObservable.create(new Error(errorMsg));
  }
}
