import { Actions, ofType, Effect } from "@ngrx/effects";
import * as authActions from "./auth.actions";
import { switchMap, catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthLoginResponseData } from "../auth.service";
import { environment } from "../../../environments/environment";
import { of } from "rxjs/observable/of";
import { User } from "../user.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {

  @Effect()
  authLogin = this.actions$.pipe(
     // filters only this action
    ofType(authActions.LOGIN_START),
    // transforms the action into a request observable
    switchMap((authData: authActions.LoginStartAction) => {
      let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + environment.firebaseAPIKey;
      return this.http.post<AuthLoginResponseData>(url, {
        email: authData.data.email,
        password: authData.data.password,
        returnSecureToken: true
      }).pipe(
          map(data => {
            // from handleAuth
            const expDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
            const user = new User(data.email, data.localId, data.idToken, expDate);
            return of(new authActions.LoginAction(user));
          }),
          catchError(error => {
            // ...
            return of(); // crucial to be non-error observable to not stop the outer
          })
        );
    }),
    // if we would catch error, the ongoing observable would die (must not)
    // so the error must be treated in the inner observable (pipe from above)
  );


  // name convention with the dollar (it's an observable)
  constructor(private actions$: Actions,
    private http: HttpClient) {

  }
}
