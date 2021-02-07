import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { InputDetailsComponent } from './input-details/input-details.component';


@NgModule({
  declarations: [
    AppComponent,
    InputDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
