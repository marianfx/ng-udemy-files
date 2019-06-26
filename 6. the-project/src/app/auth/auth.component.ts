import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";

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
    if (!this.isLoginMode) {
      this.isLoading = true;
      this.auth.signup(payload['email'], payload['password'])
        .subscribe((response: AuthResponseData) => {
          this.isLoading = false;
        }, (error: Error) => {
          console.log("Error happened: " + error.message);
          this.error = error.message;
          this.isLoading = false;
        });
    }

    f.reset();
  }
}
