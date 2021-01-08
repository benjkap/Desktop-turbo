import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  //à récupérer en base de données
  listeUtilisateurs: { userID: number, username: string, email: string, widgets: Array<{ nom: string, activation: boolean }> }[] = [{
    userID: 1,
    username: 'michel',
    email: 'michel@test.fr',
    widgets: [{nom: 'calculatrice', activation: true}, {nom: 'toDoList', activation: true}, {nom: 'agendas', activation: true}]
  }, {
    userID: 2,
    username: 'michelline',
    email: 'michelline@example.com',
    widgets: [{nom: 'calculatrice', activation: false}, {nom: 'toDoList', activation: true}, {nom: 'agendas', activation: false}]
  }, {
    userID: 3,
    username: 'testeur',
    email: 'test@gmail.com',
    widgets: [{nom: 'calculatrice', activation: false}, {nom: 'toDoList', activation: false}, {nom: 'agendas', activation: false}]
  }];
  widgetSelection = 'clock';
  data: any;

  constructor(private http: Http, private authService: AuthService) {
  }

  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  public async getList() {
    return await this.http.post('/api/admin', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(AdminPanelComponent.error);
  }

  public async updateList(data) {
    return await this.http.post('/api/admin', {token: this.authService.getToken(), data})
      .toPromise()
      .then(response => response.json())
      .catch(AdminPanelComponent.error);
  }

  displayWidget(widget: any, bool: boolean) {
    widget.isShown = bool;
    this.updateList(this.data);
  }

  selectWidget(event: any) {
    this.widgetSelection = event.target.value;
  }

  resetAccount(utilisateur: { userID: number, username: string, email: string, widgets: Array<{ nom: string, activation: boolean }> }) {
    // reset le profil de l'utilisateur
  }

  deleteAccount(utilisateur: { userID: number, username: string, email: string, widgets: Array<{ nom: string, activation: boolean }> }) {
    // supprime le profil
  }

  async ngOnInit(): Promise<void> {
    this.data = await this.getList();
    console.log(this.data);
  }

}
