import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import * as recipeActions from "../recipes/store/recipe.actions";

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
    private rService: RecipeService,
    private store: Store<fromApp.AppStateModel>) {

  }

  saveRecipes() {
    let recipes = this.rService.getRecipes();
    this.http.put('https://ng-udemy-project-e6d33.firebaseio.com/recipes.json', recipes).subscribe();
  }

  fetchData() {

  }
}
