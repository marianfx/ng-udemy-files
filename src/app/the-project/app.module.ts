import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedThingsModule } from './shared/shared-things.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment.prod';
import { RecipeEffects } from './recipes/store/recipe.effects';

// remove stuff from 'imports', but also remove import at the top because otherwise it does not reduce code size

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }), // allows debugging of redux in Chrome
    StoreRouterConnectingModule.forRoot(), // allows routing to be intercepted by reducers (and to be seen in store-dev-tools)
    AuthModule,
    ShoppingListModule,
    SharedThingsModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
