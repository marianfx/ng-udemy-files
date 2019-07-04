import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "[AUTH]SET_RECIPES";
export const FETCH_RECIPES = "[AUTH]FETCH_RECIPES";


export class SetRecipesAction implements Action {
  readonly type: string = SET_RECIPES; // this is identified in the reducer

  constructor(public data: Recipe[]) { }
}


export class FetchRecipesAction implements Action {
  readonly type: string = FETCH_RECIPES; // this is identified in the reducer

  constructor(public data: void) { }
}


export type RecipeActions = SetRecipesAction;
