import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import { Store } from "@ngrx/store";
import * as shoppingListActions from "../shopping-list/store/shopping-list.actions";

@Injectable()
export class RecipeService {

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // [
  //   new Recipe("Pizza Carnivora",
  //   "This is the best worst pizza",
  //   "https://food-images.files.bbci.co.uk/food/recipes/alpine_pizza_32132_16x9.jpg",
  //   [
  //     new Ingredient("Meat", 1),
  //     new Ingredient("French Fries", 20)
  //   ]),
  //   new Recipe("Pasta Bolognese",
  //   "Normal pasta",
  //   "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-bolognese_2.jpg",
  //   [
  //     new Ingredient("Salt", 10),
  //     new Ingredient("Parmiggiano", 200)
  //   ]),
  // ];

  constructor(private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppStateModel>) {}

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice(); // return array copy
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(i: number, recipe: Recipe) {
    this.recipes[i] = recipe;
  }

  deleteRecipe(i: number) {
    this.recipes.splice(i, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredients(recipe: Recipe) {
    this.store.dispatch(new shoppingListActions.AddIngredientsAction(recipe.ingredients));
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes ? recipes : [];
    this.recipesChanged.next(this.recipes.slice());
  }
}
