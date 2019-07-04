import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs/Subscription";
import * as fromApp from "../store/app.reducer";
import * as authActions from "../auth/store/auth.actions";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isLoggedIn = false;

  constructor(private storage: DataStorageService, private authService: AuthService,
    private store: Store<fromApp.AppStateModel>) {}

  ngOnInit() {
    this.userSubscription = this.store.select("auth")
      .pipe(map(authState => authState.user)).subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onSaveData() {
    this.storage.saveRecipes();
  }

  onFetchData() {
    this.storage.fetchData().subscribe();
  }

  onLogOut() {
    this.store.dispatch(new authActions.LogoutAction(null));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
