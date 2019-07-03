import { User } from "../user.model";
import { AuthActions } from "./auth.actions";

export interface AuthStateModel {
  user: User;
}

const initialState: AuthStateModel = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions): AuthStateModel {
  return state;
}
