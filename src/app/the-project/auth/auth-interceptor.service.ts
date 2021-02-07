import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { take, exhaustMap, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as fromAuth from "./store/auth.reducer";
import { User } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppStateModel>) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select("auth").pipe(
      take(1),
      map((stateData: fromAuth.AuthStateModel) => stateData.user),
      exhaustMap((user: User) => { // swaps the upper observable with what is returned here
        if (user && user.token) {
          const newReq = req.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(newReq);
        }

        return next.handle(req);
      }));
  }

}
