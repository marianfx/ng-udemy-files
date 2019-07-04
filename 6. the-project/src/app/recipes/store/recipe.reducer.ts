import * as recipeActions from "./recipe.actions";
import { Recipe } from "../recipe.model";

export interface RecipeStateModel {
  recipes: Recipe[];
}

const initialState: RecipeStateModel = {
  recipes: []
};

export function recipeReducer(state = initialState, action: recipeActions.RecipeActions): RecipeStateModel {
  switch(action.type) {
    case recipeActions.SET_RECIPES:
      const allRecipes = action.data;
      return {
        ...state,
        recipes: [...allRecipes]
      };
    default:
      return state;
  }
}
