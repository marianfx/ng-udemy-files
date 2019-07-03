import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


export class LoginAction implements Action {
  readonly type: string = LOGIN; // this is identified in the reducer

  constructor(public data: User) { }
}

export class LogoutAction implements Action {
  readonly type: string = LOGIN; // this is identified in the reducer

  constructor(public data: void) { }
}


export type AuthActions = LoginAction
  | LogoutAction;
