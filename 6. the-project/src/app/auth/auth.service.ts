import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { Router } from "@angular/router";
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


  constructor(private http: HttpClient, private router: Router,
    private store: Store<fromApp.AppStateModel>) {

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
      this.store.dispatch(new authActions.LoginAction(user));
      this.autoLogout(durationExpire * 1000);
    }
  }

  logout() {
    this.store.dispatch(new authActions.LogoutAction(null));
    localStorage.removeItem('userData');
    if (this.toeTimer) {
      clearTimeout(this.toeTimer);
    }
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.toeTimer = setTimeout(this.logout.bind(this), expirationDuration);
  }
}
