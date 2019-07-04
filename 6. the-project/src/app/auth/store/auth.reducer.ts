import { User } from "../user.model";
import * as authActions from "./auth.actions";

export interface AuthStateModel {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthStateModel = {
  user: null,
  authError: null,
  loading: false
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
        authError: null,
        user: userData,
        loading: false
      };

    case authActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    case authActions.LOGIN_START:
    case authActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };

    case authActions.LOGIN_FAIL:
      const failData = action.data as string;
      return {
        ...state,
        authError: failData,
        user: null,
        loading: false
      };

    default:
      return state;
  }
}
