import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss']
})
export class RepertoireComponent implements OnInit {

  data = {
    list: [{
      name: '',
      Email: '',
      phone: ''
    }],
    isShown: true
  };

  ajoutContact = false;
  modificationActive = false;
  newContact: { phone: string; Email: string; name: string };



  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  public async getList() {
    return await this.http.post('/api/contact', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(RepertoireComponent.error);
  }

  public async updateList(data) {
    return await this.http.post('/api/contact', {token: this.authService.getToken(), data: data})
      .toPromise()
      .then(response => response.json())
      .catch(RepertoireComponent.error);
  }

  onAddContact() {
    if (this.newContact.name !== '' && (this.newContact.Email !== '' || this.newContact.phone !== '')){
      this.data.list.unshift(this.newContact);
      this.newContact = {name: '', Email: '', phone: ''};
      this.ajoutContact = false;
      this.updateList(this.data);
    }
  }

  modifierContact(k: number) {
    this.modificationActive = true;
    this.newContact = {
      name: this.data.list[k].name,
      Email: this.data.list[k].Email,
      phone: this.data.list[k].phone
    };
    this.onDeleteContact(k);
    this.ajoutContact = true;
  }

  onDeleteContact(i: number) {
    this.data.list.splice(i, 1);
    this.updateList(this.data);
  }

  async ngOnInit(): Promise<void> {
    this.newContact = {name: '', Email: '', phone: ''};
    this.data = await this.getList();
  }

}
