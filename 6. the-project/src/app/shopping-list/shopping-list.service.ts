import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {

  private ingredients: Ingredient[] = [];
  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number): Ingredient {
    return this.ingredients[i];
  }

  updateIngredient(i: number, newData: Ingredient) {
    this.ingredients[i] = newData;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // doing a FOR would blow some events (if calling addIngredient)
    // this is the 'spread' operator
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
