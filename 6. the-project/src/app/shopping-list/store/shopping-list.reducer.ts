import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT, AddIngredientAction, ADD_INGREDIENTS, ShoppingListActions } from "./shopping-list.actions";

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

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  // must NOT edit the existing state, return a new one
  switch (action.type) {
    case ADD_INGREDIENT:
      const newState = {
        ...state, // copies object props
        ingredients: [...state.ingredients, // copies existing elements
          action.data
        ]
      };
      return newState;
    case ADD_INGREDIENTS:
        const newState2 = {
          ...state, // copies object props
          ingredients: [...state.ingredients, ...(action.data as Ingredient[])]
        };
        return newState2;
    default:
      return initialState;
  }
}
