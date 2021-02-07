export class User {
  constructor(public email: string, public id: string,
    private _token: string,
    private _tokenExpirationDate: Date) {}


  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      this._token = null;
    }

    return this._token;
  }

  get expirationDate() {
    return this._tokenExpirationDate;
  }
}

export class UserExtra extends User {
  redirect: boolean;

  constructor(user: User, redirect: boolean) {
    super(user.email, user.id, user.token, user.expirationDate);
    this.redirect = redirect;
  }
}
