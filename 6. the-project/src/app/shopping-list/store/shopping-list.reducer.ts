import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT, AddIngredientAction } from "./shopping-list.actions";

export class AppStateModel {
  shoppingList: ShoppingListStateModel;
}

export class ShoppingListStateModel {
  ingredients: Ingredient[];
}

const initialState: ShoppingListStateModel = {
    ingredients: [
      new Ingredient("Apples", 5),
      new Ingredient("Tomatoes", 10)
    ]
};

export function shoppingListReducer(state = initialState, action: AddIngredientAction) {
  switch (action.type) {
    case ADD_INGREDIENT:
      // must NOT edit the existing state, return a new one
      let newState = {
        ...state, // copies object props
        ingredients: [...state.ingredients, // copies existing elements
          action.data
        ]
      };
      return newState;

    default:
      return initialState;
  }
}
