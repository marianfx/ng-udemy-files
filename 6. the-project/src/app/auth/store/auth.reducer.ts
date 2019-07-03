import { User } from "../user.model";
import * as authActions from "./auth.actions";

export interface AuthStateModel {
  user: User;
}

const initialState: AuthStateModel = {
  user: null
};

export function authReducer(state = initialState, action: authActions.AuthActions): AuthStateModel {
  switch (action.type) {
    case authActions.LOGIN:
      const userData = action.data as User;
      return {
        ...state,
        user: userData
      };

    default:
      return initialState;
  }
}
