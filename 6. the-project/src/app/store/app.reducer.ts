import * as fromAuth from "../auth/store/auth.reducer";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppStateModel {
  shoppingList: fromShoppingList.ShoppingListStateModel;
  auth: fromAuth.AuthStateModel;
}

export const appReducer: ActionReducerMap<AppStateModel> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
