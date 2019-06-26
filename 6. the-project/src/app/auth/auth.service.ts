import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from "./user.model";

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


  constructor(private http: HttpClient) {

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

  private handleAuth(data: AuthLoginResponseData) {
    const expDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.localId, data.idToken, expDate);
    console.log(user);
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
