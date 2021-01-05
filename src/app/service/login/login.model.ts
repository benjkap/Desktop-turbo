export interface ILogin {
  _id?: string;
  name: string;
  password: string;
  adress: string;
}

export class Login implements ILogin {
  constructor(
    public name: string,
    public password: string,
    public adress: string,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.password = password;
    this.adress = adress;
  }
}
