import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import * as recipeActions from "./recipe.actions";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipe = this.actions$.pipe(
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

  constructor(private actions$: Actions,
    private http: HttpClient) {
  }
}
