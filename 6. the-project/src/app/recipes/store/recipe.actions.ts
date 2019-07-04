import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "[AUTH]SET_RECIPES";
export const FETCH_RECIPES = "[AUTH]FETCH_RECIPES";
export const ADD_RECIPE = "[AUTH]ADD_RECIPE";
export const UPDATE_RECIPE = "[AUTH]UPDATE_RECIPE";
export const DELETE_RECIPE = "[AUTH]DELETE_RECIPE";


export class SetRecipesAction implements Action {
  readonly type: string = SET_RECIPES; // this is identified in the reducer

  constructor(public data: Recipe[]) { }
}


export class FetchRecipesAction implements Action {
  readonly type: string = FETCH_RECIPES; // this is identified in the reducer

  constructor(public data: void) { }
}


export class AddRecipeAction implements Action {
  readonly type: string = ADD_RECIPE; // this is identified in the reducer

  constructor(public data: Recipe) { }
}


export class UpdateRecipeAction implements Action {
  readonly type: string = UPDATE_RECIPE; // this is identified in the reducer

  constructor(public data: { index: number, recipe: Recipe}) { }
}


export class DeleteRecipeAction implements Action {
  readonly type: string = DELETE_RECIPE; // this is identified in the reducer

  constructor(public data: number) { }
}



export type RecipeActions = SetRecipesAction | FetchRecipesAction |
  AddRecipeAction | DeleteRecipeAction | UpdateRecipeAction;
