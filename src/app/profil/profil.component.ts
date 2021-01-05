import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  @Input() username: string = 'default';
  @Input() email: string = 'default@example.com';
  @Input() password: string = 'password';
  @Input() wallpaper: string = '/images/wallpaper.jpg';

  isUsernameModif: string = 'false';
  isEmailModif: string = 'false';
  isPasswordModif: string = 'false';
  isWallpaperModif: string = 'false';

  isNewSave: string = 'false';

  activeModif(elt: string){
    this.isUsernameModif = 'false';
    this.isEmailModif = 'false';
    this.isPasswordModif = 'false';
    this.isWallpaperModif = 'false';
    console.log(elt);
    switch(elt) {
      case 'username': { this.isUsernameModif = 'true'; break; }
      case 'email': { this.isEmailModif = 'true'; break; }
      case 'password': { this.isPasswordModif = 'true'; break; }
      case 'wallpaper': { this.isWallpaperModif = 'true'; break; }
    }
  }

  getUrlCrayon(){
    return "url('https://i.pinimg.com/originals/47/0a/19/470a19a36904fe200610cc1f41eb00d9.jpg')";
  }

  saveChanges(){
    this.isUsernameModif = 'false';
    this.isEmailModif = 'false';
    this.isPasswordModif = 'false';
    this.isWallpaperModif = 'false';
    this.isNewSave = 'true';
    setTimeout(
      () => {
        this.isNewSave = 'false';
      }, 500
    );

    //Récupérer l'ensemble des données du profil modifiées et les stocker dans la BDD
  }

  constructor() { }

  ngOnInit(): void {
  }

}
