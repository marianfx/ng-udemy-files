import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[SL]ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[SL]ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[SL]UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[SL]DELETE_INGREDIENT';
export const START_EDIT = '[SL]START_EDIT';
export const STOP_EDIT = '[SL]STOP_EDIT';

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

  constructor(public data: { ingredient: Ingredient }) { }
}


export class DeleteIngredientAction implements Action {
  readonly type: string = DELETE_INGREDIENT; // this is identified in the reducer

  constructor(public data: void) { }
}


export class StartEditAction implements Action {
  readonly type: string = START_EDIT; // this is identified in the reducer

  constructor(public data: number) { }
}


export class StopEditAction implements Action {
  readonly type: string = STOP_EDIT; // this is identified in the reducer

  constructor(public data: void) { }
}

// export all types
export type ShoppingListActions = AddIngredientAction
| AddIngredientsAction
| UpdateIngredientAction
| DeleteIngredientAction
| StopEditAction
| StartEditAction;
