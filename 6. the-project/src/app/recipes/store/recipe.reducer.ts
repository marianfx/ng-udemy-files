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
      const allRecipes = action.data as Recipe[];
      return {
        ...state,
        recipes: [...allRecipes]
      };

    case recipeActions.ADD_RECIPE:
      const data = action.data as Recipe;
      return {
        ...state,
        recipes: [...state.recipes, data]
      };

    case recipeActions.UPDATE_RECIPE:
      const updateData = action.data as { index: number, recipe: Recipe};
      const updatedRecipe = {
        ...state.recipes[updateData.index], // extract all props
        ... updateData.recipe // replace with data given
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[updateData.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };

    case recipeActions.DELETE_RECIPE:
      let indexToDelete = action.data as number;
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => index !== indexToDelete)
      };

    default:
      return state;
  }
}
