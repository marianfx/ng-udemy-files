import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";

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

  autoLogout(expirationDuration: number) {
    // this.toeTimer = setTimeout(this.logout.bind(this), expirationDuration);
  }
}
