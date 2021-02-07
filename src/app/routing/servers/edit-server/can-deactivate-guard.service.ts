import { Observable } from "rxjs/Observable";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

// the interface that will be implemented
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean>;
}

// the actual class that uses the component interface
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return component.canDeactivate();
  }
}
