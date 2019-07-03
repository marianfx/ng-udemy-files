import { User } from "../user.model";
import * as authActions from "./auth.actions";

export interface AuthStateModel {
  user: User;
}

const initialState: AuthStateModel = {
  user: null
};

/**
 * Note: all dispatch go to all reducers. So we have to make sure:
 * all keys for actions are UNIQUE. Make 'PREFIXING".
 * everything has a 'default' where it returns the state unchanged
 */

export function authReducer(state = initialState, action: authActions.AuthActions): AuthStateModel {
  switch (action.type) {
    case authActions.LOGIN:
      const userData = action.data as User;
      return {
        ...state,
        user: userData
      };

    default:
      return state;
  }
}
