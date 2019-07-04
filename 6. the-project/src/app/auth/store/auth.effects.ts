import { Actions, ofType, Effect } from "@ngrx/effects";
import * as authActions from "./auth.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthLoginResponseData, AuthResponseData } from "../auth.service";
import { environment } from "../../../environments/environment";
import { of } from "rxjs/observable/of";
import { User } from "../user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const handleAuthentication = (data) => {
  // from handleAuth
  const expDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
  const user = new User(data.email, data.localId, data.idToken, expDate);
  return new authActions.LoginAction(user);
};

const handleError = (error) => {
  let errorMsg = "Unknown error happened";
  switch(error && error.error && error.error.error && error.error.error.message) {
    case "EMAIL_EXISTS":
        errorMsg = "E-mail already registered!";
      break;
    case "EMAIL_NOT_FOUND":
        errorMsg = "No users with this e-mail!";
      break;
    case "INVALID_PASSWORD":
        errorMsg = "Incorrect password!";
      break;
    default:
        errorMsg = "Unknown error: " + error.message;
      break;
  }
  return of(new authActions.LoginFailAction(errorMsg)); // crucial to be non-error observable to not stop the outer
};

@Injectable()
export class AuthEffects {

  // efects that does something and then sends a new action to get in
  @Effect()
  authLogin = this.actions$.pipe(
     // filters only this action
    ofType(authActions.LOGIN_START),
    // transforms the action-observable into a request-observable
    switchMap((authData: authActions.LoginStartAction) => {
      let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + environment.firebaseAPIKey;
      return this.http.post<AuthLoginResponseData>(url, {
        email: authData.data.email,
        password: authData.data.password,
        returnSecureToken: true
      }).pipe(
          map(handleAuthentication),
          catchError(handleError)
        );
    }),
    // if we would catch error, the ongoing observable would die (must not)
    // so the error must be treated in the inner observable (pipe from above)
  );


  // efect that only does something and does not map to another action
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(authActions.LOGIN, authActions.LOGOUT),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );


  // efect that triggers a new action (auth)
  @Effect()
  authLogout = this.actions$.pipe(
    ofType(authActions.SIGNUP_START),
    switchMap((signupData: authActions.SignupStartAction) => {
      let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey;
      return this.http.post<AuthResponseData>(url, {
        email: signupData.data.email,
        password: signupData.data.password,
        returnSecureToken: true
      }).pipe(
        map(handleAuthentication),
        catchError(handleError)
      );;
    })
  );


  // name convention with the dollar (it's an observable)
  constructor(private actions$: Actions,
    private http: HttpClient,
    private router: Router) {

  }
}
