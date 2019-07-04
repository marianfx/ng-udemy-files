import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import * as recipeActions from "./recipe.actions";
import { switchMap, map, tap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(recipeActions.FETCH_RECIPES),
    switchMap(() => { // switch to HTTP Observable
      let url = "https://ng-udemy-project-e6d33.firebaseio.com/recipes.json";
      return this.http.get<Recipe[]>(url);
    }),
    map(data => { // map valid ingredients
      return data.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }
      });
    }),
    map((recipes) => { // finally map to action-observable
      return new recipeActions.SetRecipesAction(recipes);
    })
  );


  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(recipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select("recipe")), // special kw that retrieves data from observable
    switchMap(([storeAction, recipesState]) => { // here receives array, with added data at the end and returns http-observable
      let url = "https://ng-udemy-project-e6d33.firebaseio.com/recipes.json";
      return this.http.put(url, recipesState.recipes);
    })
  );

  constructor(private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppStateModel>) {
  }
}
