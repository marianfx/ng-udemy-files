import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";
import { Subscription } from "rxjs/Subscription";

// https://firebase.google.com/docs/reference/rest/auth
@Component({
  selector: 'app-component',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error = '';

  closeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective; // gets the first found

  constructor(private auth: AuthService, private router: Router, private resolver: ComponentFactoryResolver) {}

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
        this.router.navigate(['/recipes']);
      }, (error: Error) => {
        console.log("Error happened: " + error.message);
        this.error = error.message;
        this.showErrorAlert(this.error);
        this.isLoading = false;
      });

    f.reset();
  }

  onErrorHandled() {
    this.error = '';
  }

  showErrorAlert(message: string) {
    const alertFactory = this.resolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // clear other components rendered here if any
    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(x => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
