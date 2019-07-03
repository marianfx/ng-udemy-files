import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT, ADD_INGREDIENTS, ShoppingListActions, UPDATE_INGREDIENT, DELETE_INGREDIENT, START_EDIT, STOP_EDIT } from "./shopping-list.actions";

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
          const updateData = action.data as { ingredient: Ingredient};
          const ingredient = state.ingredients[state.editedIngredientIndex];
          const updatedIngredient = {
            ...ingredient,
            ...updateData.ingredient
          };
          const updatedIngredients = [...state.ingredients];
          updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

          const newState3 = {
            ...state, // copies object props
            ingredients: updatedIngredients,
            editedIngredientIndex: -1
          };
          return newState3;

        case DELETE_INGREDIENT:
            const newIngredients = state.ingredients.filter((ig, index) => index !== state.editedIngredientIndex);
            const newState4 = {
              ...state, // copies object props
              ingredients: newIngredients,
              editedIngredientIndex: -1
            };
            return newState4;

        case START_EDIT:
          const startEditData = action.data as number;
          return {
            ...state,
            editedIngredientIndex: startEditData,
            editedIngredient: {...state.ingredients[startEditData]}
          };

        case STOP_EDIT:
          return {
            ...state,
            editedIngredientIndex: -1,
            editedIngredient: null
          };
    default:
      return initialState;
  }
}
