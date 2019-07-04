import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as authActions from "./store/auth.actions";

// https://firebase.google.com/docs/reference/rest/auth
@Component({
  selector: 'app-component',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error = '';
  authSubscription: Subscription;

  closeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective; // gets the first found

  constructor(private resolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppStateModel>) {}

  ngOnInit() {
    this.authSubscription = this.store.select("auth").subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    let payload = f.value; // has already correctly named fields {email, pass}
    if (this.isLoginMode) {
      // authObservable = this.auth.login(payload["email"], payload["password"]);
      this.store.dispatch(new authActions.LoginStartAction({
        email: payload["email"],
        password: payload["password"]
      }));
    } else {
      // authObservable = this.auth.signup(payload["email"], payload["password"]);
      this.store.dispatch(new authActions.SignupStartAction({
        email: payload["email"],
        password: payload["password"]
      }));
    }

    f.reset();
  }

  onErrorHandled() {
    this.store.dispatch(new authActions.ClearErrorAction(null));
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
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
