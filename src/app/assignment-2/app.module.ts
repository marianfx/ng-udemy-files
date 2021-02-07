import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"


import { AppComponent } from './app.component';
import { AppUsersComponent } from './app-users/app-users.component';


@NgModule({
  declarations: [
    AppComponent,
    AppUsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
