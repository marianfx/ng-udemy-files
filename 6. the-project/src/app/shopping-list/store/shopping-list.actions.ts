import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredientAction implements Action {
  readonly type: string = ADD_INGREDIENT; // this is identified in the reducer

  constructor(public data: Ingredient) {}
}


export class AddIngredientsAction implements Action {
  readonly type: string = ADD_INGREDIENTS; // this is identified in the reducer

  constructor(public data: Ingredient[]) {}
}

// export all types
export type ShoppingListActions = AddIngredientAction | AddIngredientsAction;
