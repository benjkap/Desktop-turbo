import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ILogin, Login} from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = '/api/login';

  constructor(private http: Http) {
  }

  // Get products
  get(): Promise<Array<ILogin>> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Get products
  getUser(user: string): Promise<Array<ILogin>> {
    return this.http.get(this.url + '/' + user)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Create product
  create(login: Login): Promise<ILogin> {
    return this.http.post(this.url, login)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Delete a product
  delete(id: string): Promise<any> {
    return this.http.delete(`${this.url}/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Error handling
  private error(error: any) {
    let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
