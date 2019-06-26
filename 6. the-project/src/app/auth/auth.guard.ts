import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.userSubject.pipe(
    take(1), // make sure you don't keep the subscription on
    map(x => {
      if (!!x) {
        return true;
      } else {
        return false;
      }

      // return this.router.createUrlTree(['/auth']); // in newer versions can do this
    }),
    tap(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth']);
      }
    })
    );
  }

}
