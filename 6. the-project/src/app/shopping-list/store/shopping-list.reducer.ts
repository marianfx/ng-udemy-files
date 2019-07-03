import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT, ADD_INGREDIENTS, ShoppingListActions, UPDATE_INGREDIENT, DELETE_INGREDIENT } from "./shopping-list.actions";

export interface AppStateModel {
  shoppingList: ShoppingListStateModel;
}

export interface ShoppingListStateModel {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListStateModel = {
    ingredients: [
      new Ingredient("Apples", 5),
      new Ingredient("Tomatoes", 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  // must NOT edit the existing state, return a new one
  switch (action.type) {
    case ADD_INGREDIENT:
        const addData = action.data as Ingredient;
      const newState = {
        ...state, // copies object props
        ingredients: [...state.ingredients, // copies existing elements
          addData
        ]
      };
      return newState;

    case ADD_INGREDIENTS:
        const addMultiData = action.data as Ingredient[];
        const newState2 = {
          ...state, // copies object props
          ingredients: [...state.ingredients, ...addMultiData]
        };
        return newState2;

      case UPDATE_INGREDIENT:
          const updateData = action.data as { index: number, ingredient: Ingredient};
          const ingredient = state.ingredients[updateData.index];
          const updatedIngredient = {
            ...ingredient,
            ...updateData.ingredient
          };
          const updatedIngredients = [...state.ingredients];
          updatedIngredients[updateData.index] = updatedIngredient;

          const newState3 = {
            ...state, // copies object props
            ingredients: updatedIngredients
          };
          return newState3;

        case DELETE_INGREDIENT:
            const deleteData = action.data as { index: number };
            const newIngredients = state.ingredients.filter((ig, index) => index !== deleteData.index);
            const newState4 = {
              ...state, // copies object props
              ingredients: newIngredients
            };
            return newState4;


    default:
      return initialState;
  }
}
