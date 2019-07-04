import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN_START = "[AUTH]LOGIN_START";
export const LOGIN_FAIL = "[AUTH]LOGIN_FAIL";
export const LOGIN = "[AUTH]LOGIN";
export const AUTOLOGIN = "[AUTH]AUTOLOGIN";
export const LOGOUT = "[AUTH]LOGOUT";
export const SIGNUP_START = "[AUTH]SIGNUP_START";
export const CLEAR_ERROR = "[AUTH]CLEAR_ERROR";


export class LoginAction implements Action {
  readonly type: string = LOGIN; // this is identified in the reducer

  constructor(public data: User) { }
}

export class LogoutAction implements Action {
  readonly type: string = LOGIN; // this is identified in the reducer

  constructor(public data: void) { }
}

export class LoginStartAction implements Action {
  readonly type: string = LOGIN_START; // this is identified in the reducer

  constructor(public data: { email: string, password: string }) { }
}

export class LoginFailAction implements Action {
  readonly type: string = LOGIN_FAIL; // this is identified in the reducer

  constructor(public data: string) { }
}

export class SignupStartAction implements Action {
  readonly type: string = SIGNUP_START; // this is identified in the reducer

  constructor(public data: { email: string, password: string }) { }
}

export class ClearErrorAction implements Action {
  readonly type: string = CLEAR_ERROR; // this is identified in the reducer

  constructor(public data: void) { }
}

export class AutoLoginAction implements Action {
  readonly type: string = AUTOLOGIN; // this is identified in the reducer

  constructor(public data: void) { }
}


export type AuthActions = LoginAction
  | LogoutAction | LoginStartAction | LoginFailAction | SignupStartAction | ClearErrorAction | AutoLoginAction;
