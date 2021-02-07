import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";
import * as fromApp from "../store/app.reducer";
import * as fromAuth from "./store/auth.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router,
    private store: Store<fromApp.AppStateModel>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select("auth").pipe(
    take(1), // make sure you don't keep the subscription on
    map((stateData: fromAuth.AuthStateModel) => stateData.user),
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
