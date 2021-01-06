import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss']
})
export class RepertoireComponent implements OnInit {

  ajoutContact: boolean = false;
  newContact: {username: string, email: string, phoneNumber: string} = {username:"", email:"", phoneNumber:""};
  //listContact à récupérer dans la database
  listContact: {username: string, email: string, phoneNumber: string}[] = [{username:"michel", email:"michel@gmail.com", phoneNumber:"0312345678"}, {username:"michelline", email:"michelline@coucou.com", phoneNumber:"0318464567"}, {username:"hugo", email:"mouette@laposte.fr", phoneNumber:"0398765432"}];

  onAddContact() {
    if (this.newContact.username != '' && (this.newContact.email != '' || this.newContact.phoneNumber != '')){
      this.listContact.push(this.newContact);
      this.newContact = {username:"", email:"", phoneNumber:""};
      this.ajoutContact = false;
    }
  }

  onDelete(i: number) {
    this.listContact.splice(i,1);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
