import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe("Pizza Carnivora",
    "This is the best worst pizza",
    "https://food-images.files.bbci.co.uk/food/recipes/alpine_pizza_32132_16x9.jpg",
    [
      new Ingredient("Meat", 1),
      new Ingredient("French Fries", 20)
    ]),
    new Recipe("Pasta Bolognese",
    "Normal pasta",
    "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-bolognese_2.jpg",
    [
      new Ingredient("Salt", 10),
      new Ingredient("Parmiggiano", 200)
    ]),
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) {}

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice(); // return array copy
  }

  addIngredients(recipe: Recipe) {
    this.slService.addIngredients(recipe.ingredients);
  }
}
