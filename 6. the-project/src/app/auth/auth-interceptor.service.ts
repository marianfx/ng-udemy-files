import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.userSubject.pipe(
      take(1),
      exhaustMap(user => { // swaps the upper observable with what is returned here
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
