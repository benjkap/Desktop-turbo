import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  //à récupérer en base de données
  listeUtilisateurs: {userID: number, username: string, email: string, widgets: Array<{nom: string, activation: boolean}>}[] = [{userID: 1, username: "michel", email: "michel@test.fr", widgets: [{nom: "calculatrice", activation: true}, {nom: "toDoList", activation: true}, {nom: "agendas", activation: true}]}, {userID: 2, username: "michelline", email: "michelline@example.com", widgets: [{nom: "calculatrice", activation: false}, {nom: "toDoList", activation: true}, {nom: "agendas", activation: false}]}, {userID: 3, username: "testeur", email: "test@gmail.com", widgets: [{nom: "calculatrice", activation: false}, {nom: "toDoList", activation: false}, {nom: "agendas", activation: false}]}];
  widgetSelection: number[] = [0,0,0];

  selectWidget(m: number, event: any) {
    this.widgetSelection[m] = event.target.value;
  }

  resetAccount(utilisateur: {userID: number, username: string, email: string, widgets: Array<{nom: string, activation: boolean}>}) {
    //reset le profil de l'utilisateur
  }

  deleteAccount(utilisateur: {userID: number, username: string, email: string, widgets: Array<{nom: string, activation: boolean}>}) {
    //supprime le profil
  }
  
  constructor() {
    
  }

  ngOnInit(): void {
  }

}
