import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isLoggedIn = false;

  constructor(private storage: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onSaveData() {
    this.storage.saveRecipes();
  }

  onFetchData() {
    this.storage.fetchData().subscribe();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
