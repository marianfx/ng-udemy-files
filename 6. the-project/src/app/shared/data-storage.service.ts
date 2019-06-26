import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private rService: RecipeService, private auth: AuthService) {

  }

  saveRecipes() {
    let recipes = this.rService.getRecipes();
    this.http.put('https://ng-udemy-project-e6d33.firebaseio.com/recipes.json', recipes).subscribe();
  }

  fetchData() {
    return this.auth.userSubject.pipe(
      take(1),
      exhaustMap(user => { // waits for first observable, then calls the next one and returns the result
        return this.http.get <Recipe[]>('https://ng-udemy-project-e6d33.firebaseio.com/recipes.json', {
          params: new HttpParams().set('auth', user.token)
        });
      }),
      map(data => {
        return data.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        });
      }),
      tap(x => {
        this.rService.setRecipes(x);
      })
    );
  }
}
