import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs/Observable";

// https://firebase.google.com/docs/reference/rest/auth
@Component({
  selector: 'app-component',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error = '';

  constructor(private auth: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    let payload = f.value; // has already correctly named fields {email, pass}
    let authObservable: Observable<AuthResponseData>;
    authObservable = this.isLoginMode
      ? this.auth.login(payload['email'], payload['password'])
      : this.auth.signup(payload['email'], payload['password']);

    this.isLoading = true;
    authObservable.subscribe((response: AuthResponseData) => {
        this.isLoading = false;
        console.log(response);
      }, (error: Error) => {
        console.log("Error happened: " + error.message);
        this.error = error.message;
        this.isLoading = false;
      });

    f.reset();
  }
}
