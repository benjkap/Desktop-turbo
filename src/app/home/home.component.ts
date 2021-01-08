import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
  }

  user = this.authService.getUserDetails();

  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  public async getBackground() {
    return await this.http.post('/api/profile/background', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }

  async ngOnInit(): Promise<void> {
    document.body.style.background = 'url(\'' + await this.getBackground() + '\')  no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  }

  ngOnDestroy(): void {
    document.body.style.background = 'none';
  }

  public logout() {
    this.authService.logout();
  }

  public ucFirst(str: string){
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }
}
