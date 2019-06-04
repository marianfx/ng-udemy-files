import { Ingredient } from "../shared/ingredient.model";
import { Output, EventEmitter } from "@angular/core";

export class ShoppingListService {

  private ingredients: Ingredient[] = [];
  @Output() ingredientAdded = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // doing a FOR would blow some events (if calling addIngredient)
    // this is the 'spread' operator
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
