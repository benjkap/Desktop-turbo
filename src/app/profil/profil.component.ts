import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Http} from '@angular/http';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnChanges{

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
  }

  user = this.authService.getUserDetails();

  username  = this.user.username;
  email = this.user.adress;
  wallpaper = '/images/wallpaper.jpg';


  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  public ucFirst(str: string){
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }

  public async getUsername() {
    return await this.http.post('/api/profile/username', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(ProfilComponent.error);
  }

  public async getAdress() {
    return await this.http.post('/api/profile/address', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(ProfilComponent.error);
  }

  public async getBackground() {
    return await this.http.post('/api/profile/background', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(ProfilComponent.error);
  }

  private errorAlert(msg: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title: msg
    });
  }

  public async updateUsername(data) {
    const result = await this.http.post('/api/profile/username', {token: this.authService.getToken(), data: data})
      .toPromise()
      .then(response => response.json())
      .catch(ProfilComponent.error);
    if (result === 'userIsFree') {
      await this.authService.updateToken();
      this.user = this.authService.getUserDetails();
    } else {
      this.errorAlert('Nom d\'utilisateur déjà utilisé');
      this.username = result;
    }

  }

  public async updateAdress(data) {
    await this.http.post('/api/profile/address', {token: this.authService.getToken(), data: data})
      .toPromise()
      .then(response => response.json())
      .catch(ProfilComponent.error);
    await this.authService.updateToken();
    this.user = this.authService.getUserDetails();
  }

  public async updateBackground(data) {
    await this.http.post('/api/profile/background', {token: this.authService.getToken(), data: data})
      .toPromise()
      .then(response => response.json())
      .catch(ProfilComponent.error);
    await this.authService.updateToken();
    this.user = this.authService.getUserDetails();
  }
  public logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.username  = await this.getUsername();
    this.email = await this.getAdress();
    this.wallpaper = await this.getBackground();
  }

  ngOnChanges() {
  }

  listeDesWidgets: {nomWidget: string, estActive: boolean}[] = [{nomWidget: "Agendas", estActive: true},{nomWidget: "toDoList", estActive: false},{nomWidget: "Bloc-note", estActive: true}, {nomWidget: "lhebfzhe", estActive: false}, {nomWidget: "Bloc-neuehf", estActive: true}]

  activerModificationWidget: boolean = false;

}
