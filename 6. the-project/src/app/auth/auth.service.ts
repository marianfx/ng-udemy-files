import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  signup(email: string, pass: string): Observable<AuthResponseData> {
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCTDY2hbATWPxVTuYbzStsv5tKsvHLc4bA';
    return this.http.post<AuthResponseData>(url, {
      email: email,
      password: pass,
      returnSecureToken: true
    }).pipe(catchError(error => {
      let errorMsg = '';
      switch(error && error.error && error.error.error && error.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMsg = 'E-mail already registered!';
          break;
        default:
            errorMsg = 'Unknown error: ' + error.message;
          break;
      }
      return ErrorObservable.create(new Error(errorMsg));
    }));
  }
}
