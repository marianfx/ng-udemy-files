import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as authActions from "./store/auth.actions";

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
  // userSubject = new BehaviorSubject<User>(null); // behavioral subject also stores previous value
  toeTimer: any;


  constructor(private store: Store<fromApp.AppStateModel>) {

  }

  setLogoutTimer(expirationDuration: number) {
    this.toeTimer = setTimeout(() => {
      this.store.dispatch(new authActions.LogoutAction(null));
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.toeTimer) {
      clearInterval(this.toeTimer);
      this.toeTimer = null;
    }
  }
}
