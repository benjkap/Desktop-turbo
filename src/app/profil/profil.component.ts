import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
  }

  user = this.authService.getUserDetails();

  @Input() username  = this.user.username;
  @Input() email = this.user.adress;
  @Input() wallpaper = '/images/wallpaper.jpg';

  isUsernameModif = 'false';
  isEmailModif = 'false';
  isWallpaperModif = 'false';

  isNewSave = 'false';

  activeModif(elt: string){
    this.isUsernameModif = 'false';
    this.isEmailModif = 'false';
    this.isWallpaperModif = 'false';
    switch (elt) {
      case 'username': { this.isUsernameModif = 'true'; break; }
      case 'email': { this.isEmailModif = 'true'; break; }
      case 'wallpaper': { this.isWallpaperModif = 'true'; break; }
    }
  }

  saveChanges(){
    this.isUsernameModif = 'false';
    this.isEmailModif = 'false';
    this.isWallpaperModif = 'false';
    this.isNewSave = 'true';
    setTimeout(
      () => {
        this.isNewSave = 'false';
      }, 700
    );

    // Stocker l'ensemble des données dans la BDD
  }

  ngOnInit() {
    this.username  = this.user.username;
    this.email = this.user.adress;
    this.wallpaper = '/images/wallpaper.jpg';
  }

}
