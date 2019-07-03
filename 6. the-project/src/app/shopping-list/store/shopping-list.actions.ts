import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class AddIngredientAction implements Action {
  readonly type: string = ADD_INGREDIENT; // this is identified in the reducer

  constructor(public data: Ingredient) { }
}


export class AddIngredientsAction implements Action {
  readonly type: string = ADD_INGREDIENTS; // this is identified in the reducer

  constructor(public data: Ingredient[]) { }
}


export class UpdateIngredientAction implements Action {
  readonly type: string = UPDATE_INGREDIENT; // this is identified in the reducer

  constructor(public data: { index: number, ingredient: Ingredient }) { }
}


export class DeleteIngredientAction implements Action {
  readonly type: string = DELETE_INGREDIENT; // this is identified in the reducer

  constructor(public data: { index: number }) { }
}


// export all types
export type ShoppingListActions = AddIngredientAction | AddIngredientsAction | UpdateIngredientAction | DeleteIngredientAction;
