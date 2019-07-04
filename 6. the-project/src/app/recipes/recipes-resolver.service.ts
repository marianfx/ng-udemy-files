import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs/Observable";
import * as fromApp from "../store/app.reducer";
import * as recipeActions from "../recipes/store/recipe.actions";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { take, map, switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<fromApp.AppStateModel>,
    private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    return this.store.select("recipe").pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0 ) {
          // little trick: inject the actions in here (no effects) and wait until it triggers an action
          return (this.actions$.pipe(ofType(recipeActions.SET_RECIPES), take(1)) as Observable<Recipe[]>);
        }

        // keep existing
        return of(recipes);
      })
    );
  }
}
