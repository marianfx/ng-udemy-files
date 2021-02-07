import { Component, OnInit } from '@angular/core';
import * as fromApp from "./store/app.reducer";
import * as authActions from "./auth/store/auth.actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppStateModel>) {}

  ngOnInit() {
    this.store.dispatch(new authActions.AutoLoginAction(null));
  }
}
