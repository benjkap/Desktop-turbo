import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class BddService {
  private url = '/api';

  constructor(private http: Http) { }

  // Get products
  get(table: string): any {
    return this.http.get(this.url + '/' + table)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Create product
  create(table: string, element: any): any {
    return this.http.post(this.url + '/' + table, element)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Delete a product
  delete(table: string, id: string): Promise<any> {
    return this.http.delete(`${this.url + '/' + table}/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  // Error handling
  private error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
