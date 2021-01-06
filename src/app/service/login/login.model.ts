export interface ILogin {
  _id?: string;
  username: string;
  password: string;
  adress: string;
}

export class Login implements ILogin {
  constructor(
    public username: string,
    public password: string,
    public adress: string,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.username = username;
    this.password = password;
    this.adress = adress;
  }
}
