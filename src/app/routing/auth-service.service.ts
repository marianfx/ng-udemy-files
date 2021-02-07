import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

export class AuthService {
  loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      setTimeout(() => {
        observer.next(this.loggedIn);
        observer.complete();
      }, 1000);
    });
  }
}
