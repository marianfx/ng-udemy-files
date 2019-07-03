import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredientAction implements Action {
  readonly type: string = ADD_INGREDIENT;
  data: Ingredient;
}
